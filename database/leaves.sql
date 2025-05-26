DROP TABLE IF EXISTS leaves;

CREATE TABLE leaves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_name TEXT NOT NULL,
    type TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending',
    days_requested INTEGER,
    days_left INTEGER DEFAULT 12,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ตัวอย่างข้อมูล
INSERT INTO leaves (employee_name, type, start_date, end_date, reason, status, days_requested, days_left)
VALUES 
('Alice', 'vacation', '2025-06-01', '2025-06-03', 'Trip with family', 'approved', 3, 9),
('Bob', 'sick', '2025-05-20', '2025-05-21', 'Flu', 'pending', 2, 10),
('Charlie', 'vacation', '2025-04-10', '2025-04-12', 'Songkran', 'rejected', 3, 12),
('David', 'sick', '2025-05-01', '2025-05-02', 'Migraine', 'approved', 2, 10);
