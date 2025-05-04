import BootstrapLayout from "@/layouts/BootstrapLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function GradeSystem() {
    const [students, setStudents] = useState([
        {
            id: '66222420099',
            name: 'นางสาวสมฤดี ใจดี',
            faculty: 'วิทยาศาสตร์',
            semester: 'ภาคเรียนที่ 3/2568',
            courses: [
                { code: 'MTH101', name: 'Calculus I', credit: 3, score: 88 },
                { code: 'PHY102', name: 'Physics II', credit: 3, score: 72 },
                { code: 'ENG201', name: 'English for Academic Purposes', credit: 2, score: 65 },
                { code: 'CSC204', name: 'Data Structures', credit: 3, score: 92 },
                { code: 'GEN101', name: 'Ethics and Morality', credit: 2, score: 55 },
            ]
        },
        {
            id: '66222420098',
            name: 'นายสมชาย ทองสุข',
            faculty: 'วิศวกรรมศาสตร์',
            semester: 'ภาคเรียนที่ 3/2568',
            courses: [
                { code: 'MTH101', name: 'Calculus I', credit: 3, score: 75 },
                { code: 'PHY102', name: 'Physics II', credit: 3, score: 85 },
                { code: 'ENG201', name: 'English for Academic Purposes', credit: 2, score: 90 },
                { code: 'CSC204', name: 'Data Structures', credit: 3, score: 68 },
                { code: 'GEN101', name: 'Ethics and Morality', credit: 2, score: 80 },
            ]
        },
        {
            id: '66222420097',
            name: 'นางสาวพรทิพย์ อ่อนหวาน',
            faculty: 'สถาปัตยกรรมศาสตร์',
            semester: 'ภาคเรียนที่ 3/2568',
            courses: [
                { code: 'MTH101', name: 'Calculus I', credit: 3, score: 62 },
                { code: 'PHY102', name: 'Physics II', credit: 3, score: 58 },
                { code: 'ENG201', name: 'English for Academic Purposes', credit: 2, score: 70 },
                { code: 'CSC204', name: 'Data Structures', credit: 3, score: 64 },
                { code: 'GEN101', name: 'Ethics and Morality', credit: 2, score: 90 },
            ]
        }
    ]);
    
    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    
    const handleDeleteStudent = () => {
        if (window.confirm("คุณต้องการลบข้อมูลนักศึกษานี้หรือไม่?")) {
            if (students.length > 0) {
                const updated = [...students];
                updated.pop();
                setStudents(updated);
                setSelectedStudent(updated[0] || null);
            }
        }
    };
    const getGrade = (score: number) => {
        if (score >= 80) return 'A';
        if (score >= 75) return 'B+';
        if (score >= 70) return 'B';
        if (score >= 65) return 'C+';
        if (score >= 60) return 'C';
        if (score >= 55) return 'D+';
        if (score >= 50) return 'D';
        return 'F';
    };

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'bg-success text-white';
            case 'B+': return 'bg-info text-white';
            case 'B': return 'bg-primary text-white';
            case 'C+': return 'bg-warning text-dark';
            case 'C': return 'bg-secondary text-white';
            case 'D+': return 'bg-danger text-white';
            case 'D': return 'bg-light text-dark';
            default: return 'bg-dark text-white';
        }
    };
    const getGradePoint = (grade: string): number => {
        switch (grade) {
            case 'A': return 4.0;
            case 'B+': return 3.5;
            case 'B': return 3.0;
            case 'C+': return 2.5;
            case 'C': return 2.0;
            case 'D+': return 1.5;
            case 'D': return 1.0;
            default: return 0.0;
        }
    };
    
    const calculateGPA = () => {
        const courses = selectedStudent.courses;
        if (courses.length === 0) return 0;
    
        let totalCredits = 0;
        let totalGradePoints = 0;
    
        courses.forEach(course => {
            const grade = getGrade(course.score);
            const gradePoint = getGradePoint(grade);
            totalCredits += course.credit;
            totalGradePoints += gradePoint * course.credit;
        });
        
    
        return (totalGradePoints / totalCredits).toFixed(2);
    };

    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const student = students.find((s) => s.id === selectedId);
        if (student) setSelectedStudent(student);
    };

    return (
        <BootstrapLayout>
    <div className="container py-4" style={{ maxWidth: "900px" }}>
        <Head title="ระบบตรวจสอบผลการเรียน" />

        <h1 className="mb-4 text-primary fw-bold">📚 ตรวจสอบผลการเรียน</h1><h3 className="mb-4 text-primary">(สำหรับอาจารย์)</h3>

        {/* จำนวนและปุ่มควบคุม */}
        <div className="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-2">
  <h5 className="text-success mb-0">
    👥 จำนวนนักศึกษาในระบบ: <span className="badge bg-success">{students.length}</span>
  </h5>

  <div className="d-flex align-items-center">
    <button
      className="btn btn-outline-success me-2"
      onClick={() => {
        const name = prompt("กรอกชื่อนักศึกษาใหม่:");
        if (name) {
          const newId = `id${students.length + 1}`;
          const newStudent = {
            id: newId,
            name: name,
            faculty: "ไม่ระบุ",
            semester: "ภาคเรียนที่ 3/2568",
            courses: []
          };
          setStudents([...students, newStudent]);
          setSelectedStudent(newStudent);
        }
      }}
    >
      ➕ เพิ่มชื่อนักศึกษา
    </button>
    <button
      className="btn btn-outline-danger"
      onClick={handleDeleteStudent}
    >
      ➖ ลบชื่อนักศึกษา
    </button>
  </div>
</div>


        {/* เลือกนักศึกษา */}
        <div className="mb-4">
            <label htmlFor="studentSelect" className="form-label fw-bold">🔍 เลือกนักศึกษา:</label>
            <select
                id="studentSelect"
                className="form-select"
                value={selectedStudent?.id}
                onChange={handleStudentChange}
            >
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.name} ({student.faculty})
                    </option>
                ))}
            </select>
        </div>

        {/* ข้อมูลนักศึกษาแบบ Card */}
        <div className="card shadow-sm mb-4 border-primary">
            <div className="card-header bg-black text-white fw-bold">
                📄 ข้อมูลนักศึกษา
                
            </div>
            <div className="card-body">
                <p><strong>รหัสนักศึกษา:</strong> {selectedStudent?.id}</p>
                <p><strong>ชื่อ:</strong> {selectedStudent?.name}</p>
                <p><strong>คณะ:</strong> {selectedStudent?.faculty}</p>
                <p><strong>ภาคเรียน:</strong> {selectedStudent?.semester}</p>
                <p><strong>เกรดเฉลี่ย (GPA) : </strong> <span className="text-success">{calculateGPA()}</span></p>
            </div>
        </div>

        {/* ตารางวิชา */}
        <div className="table-responsive mt-4">
  <table className="table table-striped table-bordered table-hover align-middle shadow-sm">
    <thead className="table-dark text-center">
      <tr>
        <th>รหัสวิชา</th>
        <th>ชื่อวิชา</th>
        <th>หน่วยกิต</th>
        <th>คะแนน</th>
        <th>เกรด</th>
      </tr>
    </thead>
    <tbody>
      {selectedStudent.courses.map((course, index) => {
        const grade = getGrade(course.score);
        return (
          <tr key={index}>
            <td>{course.code}</td>
            <td>{course.name}</td>
            <td className="text-center">{course.credit}</td>
            <td className="text-center">
              {course.score}
              
            
            </td>
            <td className="text-center">
              <span className={`badge ${getGradeColor(grade)}`}>
                {grade}
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
    </div>
</BootstrapLayout>
    );
}
