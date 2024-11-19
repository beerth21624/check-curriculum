import React, { useState } from 'react';
import { TextInput, Group, Button } from '@mantine/core';
import { IconPlus, IconAlertTriangle } from '@tabler/icons-react';
import ConfirmationModal from '@/components/ConfirmationModal';
import { notifications } from '@mantine/notifications';
import { defaultRequiredCourses, defaultCoreCourses, generalEducationCourses } from '../app/mock-data';



interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    category: 'general' | 'specialized' | 'freeElective';
    subcategory?: string;
    prereq?: string;
}
interface GeneralCourse {
    code: string;
    name: string;
    credits: number;
    faculty: string;
    category: 'general';
    subcategory: 'wellness' | 'entrepreneurship' | 'language' | 'citizenship' | 'aesthetics' | 'extra';
}
interface AutoAddCourseInputProps {
    onAdd: (course: Course) => void;
    existingCourses: Course[]; // เพิ่ม prop นี้
}

const AutoAddCourseInput: React.FC<AutoAddCourseInputProps> = ({ onAdd, existingCourses }) => {
    const [courseCode, setCourseCode] = useState('');
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<GeneralCourse | null>(null);

    const checkDuplicate = (code: string): boolean => {
        return existingCourses.some(course => course.code === code);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ตรวจสอบว่ามีรายวิชาในฐานข้อมูลหรือไม่
        const course = generalEducationCourses[courseCode];

        if (!course) {
            notifications.show({
                title: 'ไม่พบรายวิชา',
                message: `ไม่พบรายวิชารหัส ${courseCode} ในฐานข้อมูล`,
                color: 'red',
                icon: <IconAlertTriangle size={24} />,
            });
            return;
        }

        // ตรวจสอบรายวิชาซ้ำ
        if (checkDuplicate(courseCode)) {
            notifications.show({
                title: 'พบรายวิชาซ้ำ',
                message: `รายวิชารหัส ${courseCode} มีอยู่ในระบบแล้ว`,
                color: 'red',
                icon: <IconAlertTriangle size={24} />,
            });
            return;
        }

        setSelectedCourse(course);
        setConfirmModalOpen(true);
    };

    const handleConfirm = (category: string, subcategory: string) => {
        if (selectedCourse) {
            const newCourse: Course = {
                id: selectedCourse.code,
                code: selectedCourse.code,
                name: selectedCourse.name,
                credits: selectedCourse.credits,
                category: category as 'general' | 'specialized' | 'freeElective',
                subcategory: subcategory || undefined,
                prereq: '-'
            };
            onAdd(newCourse);
        }
        setCourseCode('');
        setConfirmModalOpen(false);
        setSelectedCourse(null);
    };

    const handleCodeChange = (value: string) => {
        setCourseCode(value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Group align="flex-end">
                    <TextInput
                        label="เพิ่มรายวิชาอัตโนมัติ"
                        placeholder="กรอกรหัสวิชา เช่น 01355101"
                        value={courseCode}
                        onChange={(e) => handleCodeChange(e.currentTarget.value)}
                        pattern="^\d{8}$"
                        error={courseCode && !/^\d{8}$/.test(courseCode) ? "รหัสวิชาต้องเป็นตัวเลข 8 หลัก" : null}
                    />
                    <Button
                        type="submit"
                        disabled={!/^\d{8}$/.test(courseCode)}
                        leftSection={<IconPlus size={14} />}
                    >
                        เพิ่มรายวิชา
                    </Button>
                </Group>
            </form>

            <ConfirmationModal
                course={selectedCourse}
                opened={confirmModalOpen}
                onClose={() => {
                    setConfirmModalOpen(false);
                    setSelectedCourse(null);
                }}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default AutoAddCourseInput;