import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import BootstrapLayout from '../layouts/BootstrapLayout';

export default function LeaveForm({ leave = null, errors = {} }: any) {
  const [formData, setFormData] = useState({
    employee_name: leave?.employee_name || '',
    leave_type: leave?.leave_type || '',
    start_date: leave?.start_date || '',
    end_date: leave?.end_date || '',
    reason: leave?.reason || '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (leave) {
      router.put(`/leave/${leave.id}`, formData);
    } else {
      router.post('/leave', formData);
    }
    if (new Date(formData.start_date) > new Date(formData.end_date)) {
  alert('วันที่เริ่มลาต้องไม่เกินวันที่สิ้นสุด');
  return;
}
  };

  const handleReset = () => {
    setFormData({
      employee_name: '',
      leave_type: '',
      start_date: '',
      end_date: '',
      reason: '',
    });
  };

  return (
    <BootstrapLayout>
      <div className="container mt-5">
        <div className="card shadow rounded-4 border-0 bg-body text-body">
          <div className="card-body">
            <h3 className="mb-4 fw-bold">
              {leave ? '✏️ แก้ไขใบลา' : '📝 ยื่นใบลาใหม่'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">ชื่อพนักงาน</label>
                  <input
                    type="text"
                    name="employee_name"
                    className={`form-control ${errors.employee_name ? 'is-invalid' : ''}`}
                    value={formData.employee_name}
                    onChange={handleChange}
                  />
                  {errors.employee_name && (
                    <div className="invalid-feedback">{errors.employee_name}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">ประเภทการลา</label>
                  <select
                    name="leave_type"
                    className={`form-select ${errors.leave_type ? 'is-invalid' : ''}`}
                    value={formData.leave_type}
                    onChange={handleChange}
                  >
                    <option value="">-- เลือก --</option>
                    <option value="ลากิจ">ลากิจ</option>
                    <option value="ลาป่วย">ลาป่วย</option>
                    <option value="ลาพักร้อน">ลาพักร้อน</option>
                    <option value="ลาไม่รับค่าจ้าง">ลาไม่รับค่าจ้าง</option>
                  </select>
                  {errors.leave_type && (
                    <div className="invalid-feedback">{errors.leave_type}</div>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">วันที่เริ่มลา</label>
                  <input
                    type="date"
                    name="start_date"
                    className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                  {errors.start_date && (
                    <div className="invalid-feedback">{errors.start_date}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">วันที่สิ้นสุด</label>
                  <input
                    type="date"
                    name="end_date"
                    className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                    value={formData.end_date}
                    onChange={handleChange}
                  />
                  {errors.end_date && (
                    <div className="invalid-feedback">{errors.end_date}</div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">เหตุผลในการลา</label>
                <textarea
                  name="reason"
                  className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                  rows={3}
                  value={formData.reason}
                  onChange={handleChange}
                ></textarea>
                {errors.reason && (
                  <div className="invalid-feedback">{errors.reason}</div>
                )}
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="reset" className="btn btn-outline-secondary" onClick={handleReset}>
                  🔄 ล้างฟอร์ม
                </button>
                <button type="submit" className="btn btn-primary">
                  💾 {leave ? 'อัปเดตใบลา' : 'บันทึกใบลา'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BootstrapLayout>
  );
}
