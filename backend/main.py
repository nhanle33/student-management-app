from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import engine, get_db, Base
import models
import schemas
import csv
import io

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== CLASS ENDPOINTS =====================

# Get all classes
@app.get("/api/classes")
def get_classes(db: Session = Depends(get_db)):
    return db.query(models.Class).all()

# Create class
@app.post("/api/classes")
def create_class(class_data: schemas.ClassCreate, db: Session = Depends(get_db)):
    db_class = models.Class(**class_data.dict())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

# Get class by ID
@app.get("/api/classes/{class_id}")
def get_class(class_id: str, db: Session = Depends(get_db)):
    db_class = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    return db_class

# Update class
@app.put("/api/classes/{class_id}")
def update_class(
    class_id: str,
    class_update: schemas.ClassUpdate,
    db: Session = Depends(get_db)
):
    db_class = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    
    for key, value in class_update.dict().items():
        setattr(db_class, key, value)
    
    db.commit()
    db.refresh(db_class)
    return db_class

# Delete class
@app.delete("/api/classes/{class_id}")
def delete_class(class_id: str, db: Session = Depends(get_db)):
    db_class = db.query(models.Class).filter(models.Class.class_id == class_id).first()
    if not db_class:
        raise HTTPException(status_code=404, detail="Class not found")
    
    db.delete(db_class)
    db.commit()
    return {"message": "Class deleted"}

# ===================== STUDENT ENDPOINTS =====================

# Get all students
@app.get("/api/students")
def get_students(db: Session = Depends(get_db)):
    return db.query(models.Student).all()

# Search students by name
@app.get("/api/students/search/by-name")
def search_students(name: str = Query(...), db: Session = Depends(get_db)):
    students = db.query(models.Student).filter(
        models.Student.name.ilike(f"%{name}%")
    ).all()
    return students

# Get student by ID
@app.get("/api/students/{student_id}")
def get_student(student_id: str, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(models.Student.student_id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

# Create student
@app.post("/api/students")
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

# Update student
@app.put("/api/students/{student_id}")
def update_student(
    student_id: str,
    student_update: schemas.StudentUpdate,
    db: Session = Depends(get_db)
):
    db_student = db.query(models.Student).filter(models.Student.student_id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    for key, value in student_update.dict().items():
        setattr(db_student, key, value)
    
    db.commit()
    db.refresh(db_student)
    return db_student

# Delete student
@app.delete("/api/students/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db)):
    db_student = db.query(models.Student).filter(models.Student.student_id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    db.delete(db_student)
    db.commit()
    return {"message": "Student deleted"}

# ===================== STATISTICS ENDPOINTS =====================

@app.get("/api/statistics")
def get_statistics(db: Session = Depends(get_db)):
    total_students = db.query(func.count(models.Student.id)).scalar()
    
    avg_gpa = db.query(func.avg(models.Student.gpa)).scalar()
    avg_gpa = float(avg_gpa) if avg_gpa else 0
    
    # Students by major
    major_counts = db.query(
        models.Student.major,
        func.count(models.Student.id).label("count")
    ).group_by(models.Student.major).all()
    
    students_by_major = {major: count for major, count in major_counts}
    
    return {
        "total_students": total_students,
        "average_gpa": round(avg_gpa, 2),
        "students_by_major": students_by_major
    }

# ===================== EXPORT ENDPOINTS =====================

@app.get("/api/export/csv")
def export_to_csv(db: Session = Depends(get_db)):
    students = db.query(models.Student).all()
    
    # Create CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow(["Student ID", "Name", "Birth Year", "Major", "GPA", "Class ID"])
    
    # Write student data
    for student in students:
        writer.writerow([
            student.student_id,
            student.name,
            student.birth_year,
            student.major,
            student.gpa,
            student.class_id
        ])
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=students.csv"}
    )

# Health check
@app.get("/api/health")
def health_check():
    return {"status": "ok"}
