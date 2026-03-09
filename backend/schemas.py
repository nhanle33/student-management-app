from pydantic import BaseModel
from typing import Optional

class ClassCreate(BaseModel):
    class_id: str
    class_name: str
    advisor: str

class ClassUpdate(BaseModel):
    class_name: str
    advisor: str

class Class(ClassCreate):
    id: int
    
    class Config:
        from_attributes = True

class StudentCreate(BaseModel):
    student_id: str
    name: str
    birth_year: int
    major: str
    gpa: float
    class_id: str

class StudentUpdate(BaseModel):
    name: str
    birth_year: int
    major: str
    gpa: float
    class_id: str

class Student(StudentCreate):
    id: int
    class_info: Optional[Class] = None
    
    class Config:
        from_attributes = True

class Statistics(BaseModel):
    total_students: int
    average_gpa: float
    students_by_major: dict

