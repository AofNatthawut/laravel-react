<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class LeaveSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('leaves')->insert([
    [
        'employee_name' => 'สมชาย ใจดี',
        'type' => 'ลาพักร้อน',
        'start_date' => '2025-06-01',
        'end_date' => '2025-06-03',
        'reason' => 'ลาพักร้อน',
        'status' => 'pending',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
    [
        'employee_name' => 'สุนีย์ พักใจ',
        'type' => 'ลากิจ',
        'start_date' => '2025-06-05',
        'end_date' => '2025-06-05',
        'reason' => 'ลากิจด่วน',
        'status' => 'approved',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
    [
        'employee_name' => 'วีระ ขยันดี',
        'type' => 'ลาป่วย',
        'start_date' => '2025-06-10',
        'end_date' => '2025-06-12',
        'reason' => 'ลาป่วย มีใบรับรองแพทย์',
        'status' => 'rejected',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
    [
        'employee_name' => 'ณัฐพล หยุดพัก',
        'type' => 'ลาพักร้อน',
        'start_date' => '2025-06-15',
        'end_date' => '2025-06-17',
        'reason' => 'ลาพักผ่อนประจำปี',
        'status' => 'pending',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
    [
        'employee_name' => 'ศิริพร ไปธุระ',
        'type' => 'ลากิจ',
        'start_date' => '2025-06-20',
        'end_date' => '2025-06-20',
        'reason' => 'ไปรับลูก',
        'status' => 'approved',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
    ],
]);

    }
}
