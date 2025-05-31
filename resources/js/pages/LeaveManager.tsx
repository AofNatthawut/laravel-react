import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import BootstrapLayout from '../layouts/BootstrapLayout';

export default function LeaveManager({ leaves, flash }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (flash?.message) {
      alert(flash.message);
    }
  }, [flash?.message]);

  const handleDelete = (id: number) => {
    if (confirm('ลบใบลานี้?')) {
      router.delete(`/leave/${id}`);
    }
  };

  const handleApprove = (id: number) => {
    router.put(`/leave/${id}`, { status: 'approved' });
  };

  const filteredLeaves = leaves.filter((leave: any) =>
    leave.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BootstrapLayout>
      <div className="bg-dark text-white min-vh-100">
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
  <h2 className="fw-bold">📋 รายการการลางานของพนักงาน</h2>
  <div className="d-flex align-items-center gap-2 flex-wrap">
    <input
      type="text"
      className="form-control form-control-sm"
      style={{ width: '240px' }}
      placeholder="🔍 ค้นหาชื่อพนักงาน..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <a href="/leave/create" className="btn btn-success btn-sm">+ ขอลางาน</a>
  </div>
</div>

          <div className="card bg-secondary text-white shadow rounded-4 border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-bordered table-hover align-middle text-center">
                  <thead className="table-secondary text-dark">
                    <tr>
                      <th style={{ width: '12%' }}>ชื่อ-นามสกุล</th>
                      <th style={{ width: '10%' }}>ประเภทการลา</th>
                      <th style={{ width: '10%' }}>เริ่มตั้งแต่</th>
                      <th style={{ width: '10%' }}>สิ้นสุด</th>
                      <th style={{ width: '25%' }}>เหตุผลในการลา</th>
                      <th style={{ width: '10%' }}>สถานะการลา</th>
                      <th style={{ width: '23%' }}>รายการการจัดการใบลา</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaves.map((leave: any) => (
                      <tr key={leave.id}>
                        <td>{leave.employee_name}</td>
                        <td>
                          <span className="badge bg-info text-dark px-3 py-2">
                            {leave.type}
                          </span>
                        </td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td className="text-start">{leave.reason}</td>
                        <td>
                          <span className={`badge px-3 py-2 ${leave.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {leave.status === 'approved' ? '✅ อนุมัติแล้ว' : '⏳ รออนุมัติ'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <a href={`/leave/${leave.id}/edit`} className="btn btn-sm btn-outline-light">✏️ แก้ไขใบลา</a>
                            {leave.status !== 'approved' && (
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleApprove(leave.id)}>
                                ✅ อนุมัติ
                              </button>
                            )}
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(leave.id)}>
                              🗑️ ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredLeaves.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-muted py-3">ไม่พบข้อมูลใบลาตามที่ค้นหา</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}
