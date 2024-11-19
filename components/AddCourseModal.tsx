import React, { useState, useEffect } from 'react';
import { Modal, Stack, TextInput, Button, Alert } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';

interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    category: 'general' | 'specialized' | 'freeElective';
    subcategory?: string;
    prereq?: string;
}
interface AddCourseModalProps {
    opened: boolean;
    onClose: () => void;
    onAdd: (course: Course) => void;
    initialCategory: string;
    initialSubcategory?: string;
    selectedCourses: Course[]; // เพิ่ม prop นี้เพื่อใช้ตรวจสอบรายวิชาซ้ำ
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
    opened,
    onClose,
    onAdd,
    initialCategory,
    initialSubcategory,
    selectedCourses
}) => {
    const [newCourse, setNewCourse] = useState<Course>({
        id: '',
        code: '',
        name: '',
        credits: 0,
        category: initialCategory as any,
        subcategory: initialSubcategory,
    });

    const [error, setError] = useState<string | null>(null);

    // Reset form when modal is opened
    useEffect(() => {
        if (opened) {
            setNewCourse({
                id: '',
                code: '',
                name: '',
                credits: 0,
                category: initialCategory as any,
                subcategory: initialSubcategory,
            });
            setError(null);
        }
    }, [opened, initialCategory, initialSubcategory]);

    // ตรวจสอบรายวิชาซ้ำ
    const checkDuplicate = (courseCode: string): boolean => {
        return selectedCourses.some(course => course.code === courseCode);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newCourse.code || !newCourse.name || !newCourse.credits) {
            return;
        }

        // ตรวจสอบรายวิชาซ้ำ
        if (checkDuplicate(newCourse.code)) {
            setError(`รายวิชารหัส ${newCourse.code} มีอยู่ในระบบแล้ว`);
            notifications.show({
                title: 'ไม่สามารถเพิ่มรายวิชาได้',
                message: `รายวิชารหัส ${newCourse.code} มีอยู่ในระบบแล้ว`,
                color: 'red',
                icon: <IconAlertCircle size={24} />,
            });
            return;
        }

        // Create the course object with ID
        const courseToAdd: Course = {
            ...newCourse,
            id: newCourse.code,
        };

        // Call onAdd with the new course
        onAdd(courseToAdd);

        // Close modal and reset error
        setError(null);
        onClose();
    };

    // ตรวจสอบรายวิชาซ้ำแบบ Real-time
    const handleCodeChange = (code: string) => {
        setNewCourse({ ...newCourse, code });
        if (code && checkDuplicate(code)) {
            setError(`รายวิชารหัส ${code} มีอยู่ในระบบแล้ว`);
        } else {
            setError(null);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="เพิ่มรายวิชา"
            size="lg"
        >
            <form onSubmit={handleSubmit}>
                <Stack>
                    {error && (
                        <Alert color="red" variant="light" icon={<IconAlertCircle size={16} />}>
                            {error}
                        </Alert>
                    )}

                    <TextInput
                        label="รหัสวิชา"
                        placeholder="01418111"
                        value={newCourse.code}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        error={error}
                        required
                    />
                    <TextInput
                        label="ชื่อวิชา"
                        placeholder="Introduction to Computer Science"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                        required
                    />
                    <TextInput
                        label="หน่วยกิต"
                        type="number"
                        placeholder="3"
                        value={newCourse.credits || ''}
                        onChange={(e) => setNewCourse({ ...newCourse, credits: parseInt(e.target.value) || 0 })}
                        required
                    />
                    <TextInput
                        label="วิชาบังคับก่อน"
                        placeholder="-"
                        value={newCourse.prereq || '-'}
                        onChange={(e) => setNewCourse({ ...newCourse, prereq: e.target.value })}
                    />
                    <Button
                        type="submit"
                        disabled={!newCourse.code || !newCourse.name || !newCourse.credits || error !== null}
                    >
                        เพิ่มรายวิชา
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export default AddCourseModal;