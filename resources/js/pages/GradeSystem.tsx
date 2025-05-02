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

    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const student = students.find((s) => s.id === selectedId);
        if (student) setSelectedStudent(student);
    };

    return (
        <BootstrapLayout>
            <div className="container py-4">
                <Head title="ระบบตรวจสอบผลการเรียน" />
                <h1 className="mb-4 text-primary fw-bold">📚 ตรวจสอบผลการเรียน</h1>

                {/* เลือกนักศึกษา */}
                <div className="mb-4">
                    <label htmlFor="studentSelect" className="form-label">เลือกนักศึกษา:</label>
                    <select
                        id="studentSelect"
                        className="form-select"
                        value={selectedStudent.id}
                        onChange={handleStudentChange}
                    >
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} ({student.faculty})
                            </option>
                        ))}
                    </select>
                </div>

                {/* ข้อมูลนักศึกษา */}
                <div className="mb-4 text-black fw-bold">
                    <p><strong>รหัสนักศึกษา:</strong> {selectedStudent.id}</p>
                    <p><strong>ชื่อ:</strong> {selectedStudent.name}</p>
                    <p><strong>คณะ:</strong> {selectedStudent.faculty}</p>
                    <p><strong>ภาคเรียน:</strong> {selectedStudent.semester}</p>
                </div>

                {/* ตารางวิชา */}
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
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
                                        <td>{course.credit}</td>
                                        <td>{course.score}</td>
                                        <td>
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
