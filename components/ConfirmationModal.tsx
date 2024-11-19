import React, { useState } from 'react';
import { Modal, Stack, Alert, Paper, Group, Text, Badge, Divider, Button, Select } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';


interface GeneralCourse {
    code: string;
    name: string;
    credits: number;
    faculty: string;
    category: 'general';
    subcategory: 'wellness' | 'entrepreneurship' | 'language' | 'citizenship' | 'aesthetics' | 'extra';
}
interface ConfirmationModalProps {
    course: GeneralCourse | null;
    opened: boolean;
    onClose: () => void;
    onConfirm: (category: string, subcategory: string) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    course,
    opened,
    onClose,
    onConfirm,
}) => {
    if (!course) return null;

    const [selectedCategory, setSelectedCategory] = useState<string>('general');
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>(course.subcategory);

    const subcategoryNames: Record<string, string> = {
        wellness: "กลุ่มสาระอยู่ดีมีสุข",
        entrepreneurship: "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ",
        language: "กลุ่มสาระภาษากับการสื่อสาร",
        citizenship: "กลุ่มสาระพลเมืองไทยและพลเมืองโลก",
        aesthetics: "กลุ่มสาระสุนทรียศาสตร์",
        extra: "เลือกเรียนรายวิชาใน 5 กลุ่มสาระ"
    };

    const categoryOptions = [
        { value: 'general', label: 'หมวดวิชาศึกษาทั่วไป' },
        { value: 'specialized', label: 'หมวดวิชาเฉพาะ' },
        { value: 'freeElective', label: 'หมวดวิชาเลือกเสรี' }
    ];

    const subcategoryOptions = {
        general: [
            { value: 'wellness', label: 'กลุ่มสาระอยู่ดีมีสุข' },
            { value: 'entrepreneurship', label: 'กลุ่มสาระศาสตร์แห่งผู้ประกอบการ' },
            { value: 'language', label: 'กลุ่มสาระภาษากับการสื่อสาร' },
            { value: 'citizenship', label: 'กลุ่มสาระพลเมืองไทยและพลเมืองโลก' },
            { value: 'aesthetics', label: 'กลุ่มสาระสุนทรียศาสตร์' },
            { value: 'extra', label: 'เลือกเรียนรายวิชาใน 5 กลุ่มสาระ' }
        ],
        specialized: [
            { value: 'core', label: 'วิชาแกน' },
            { value: 'required', label: 'วิชาเฉพาะบังคับ' },
            { value: 'elective', label: 'วิชาเฉพาะเลือก' }
        ]
    };

    const handleConfirm = () => {
        onConfirm(selectedCategory, selectedCategory === 'freeElective' ? '' : selectedSubcategory);
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="ยืนยันการเพิ่มรายวิชา"
            size="lg"
        >
            <Stack gap="md">
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="ตรวจสอบข้อมูลรายวิชา"
                    color="blue"
                >
                    กรุณาตรวจสอบข้อมูลรายวิชาและเลือกหมวดหมู่ที่ต้องการให้ถูกต้องก่อนยืนยันการเพิ่มรายวิชา
                </Alert>

                <Paper withBorder p="md" radius="md">
                    <Stack gap="xs">
                        <Group justify='space-between'>
                            <Text fw={500} size="lg">{course.name}</Text>
                            <Badge size="lg" radius="md">
                                {course.code}
                            </Badge>
                        </Group>

                        <Divider />

                        <Group justify='space-between'>
                            <Text c="dimmed">หน่วยกิต</Text>
                            <Badge variant="dot" size="lg">
                                {course.credits} หน่วยกิต
                            </Badge>
                        </Group>

                        <Group justify='space-between'>
                            <Text c="dimmed">สังกัด</Text>
                            <Text>{course.faculty}</Text>
                        </Group>

                        <Divider my="sm" />

                        <Select
                            label="เลือกหมวดหมู่"
                            placeholder="เลือกหมวดหมู่"
                            data={categoryOptions}
                            value={selectedCategory}
                            onChange={(value) => {
                                setSelectedCategory(value || 'general');
                                setSelectedSubcategory('');
                            }}
                        />

                        {selectedCategory !== 'freeElective' && (
                            <Select
                                label="เลือกกลุ่มสาระ"
                                placeholder="เลือกกลุ่มสาระ"
                                data={subcategoryOptions[selectedCategory as keyof typeof subcategoryOptions] || []}
                                value={selectedSubcategory}
                                onChange={(value) => setSelectedSubcategory(value || '')}
                            />
                        )}
                    </Stack>
                </Paper>

                <Group justify="flex-end" mt="md">
                    <Button variant="light" color="gray" onClick={onClose}>
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={selectedCategory !== 'freeElective' && !selectedSubcategory}
                    >
                        ยืนยันการเพิ่มรายวิชา
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ConfirmationModal;