<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leave;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class LeaveController extends Controller
{
    public function index()
    {
        return Inertia::render('LeaveManager', [
            'leaves' => Leave::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string',
            'leave_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string'
        ]);

        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);
        $days = $start->diffInDays($end) + 1;

        $latestLeave = Leave::where('employee_name', $validated['employee_name'])->latest()->first();
        $daysLeft = $latestLeave ? $latestLeave->days_left : 12;

        if ($days > $daysLeft) {
            return back()->withErrors(['days' => 'จำนวนวันลาคงเหลือไม่พอ']);
        }

        Leave::create(array_merge($validated, [
            'days_requested' => $days,
            'days_left' => $daysLeft - $days,
            'status' => 'pending'
        ]));

        return redirect('/leave');
    }

    public function update(Request $request, $id)
    {
        $leave = Leave::findOrFail($id);

        // ถ้ามีแค่สถานะมา แปลว่าเป็นการอนุมัติ/ปฏิเสธ
        if ($request->has('status')) {
    $leave->status = $request->input('status');
    $leave->save();
    return redirect()->back()->with('message', 'อัปเดตสถานะสำเร็จ');

}

        // อัปเดตข้อมูลใบลา
        $validated = $request->validate([
            'employee_name' => 'required|string',
            'leave_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);
        $days = $start->diffInDays($end) + 1;

        $leave->update(array_merge($validated, [
            'days_requested' => $days,
        ]));

        return redirect('/leave');
    }

    public function destroy($id)
    {
        Leave::findOrFail($id)->delete();
        return redirect()->back();
    }

    public function create(): Response
    {
        return Inertia::render('LeaveForm', ['leave' => null]);
    }

    public function edit($id): Response
    {
        $leave = Leave::findOrFail($id);
        return Inertia::render('LeaveForm', ['leave' => $leave]);
    }
}
