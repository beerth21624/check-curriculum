'use client';

import React, { useState, useEffect } from 'react';
import {
  Text,
  Badge,
  Card,
  Container,
  Title,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Grid,
  Paper,
  Alert,
  Stack,
  Accordion,
  Modal,
  Select,
  Tooltip,
  ThemeIcon,
  Progress,
  Divider,
  Flex,
  Anchor,
  Autocomplete,
  Highlight,
} from '@mantine/core';
import {
  IconPlus,
  IconX,
  IconAlertCircle,
  IconCheck,
  IconAlertTriangle,
  IconBook,
  IconCode,
  IconStars,
  IconCheckbox,
  IconCircleCheck,
  IconFolder,
  IconTrash,
  IconRefresh,
  IconEraser,
  IconBrandGithub,
  IconHeart,
} from '@tabler/icons-react';
import { Table } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import ConfirmationModal from '@/components/ConfirmationModal';
import AddCourseModal from '@/components/AddCourseModal';
import { defaultRequiredCourses, defaultCoreCourses, generalEducationCourses } from './mock-data'
import AutoAddCourseInput from '@/components/AutoAddCourseInput';

// Types
interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  category: 'general' | 'specialized' | 'freeElective';
  subcategory?: string;
  prereq?: string;
}

interface CurriculumStructure {
  [key: string]: {
    name: string;
    required: number;
    subcategories?: {
      [key: string]: {
        name: string;
        required: number;
      };
    };
  };
}


interface GeneralCourse {
  code: string;
  name: string;
  credits: number;
  faculty: string;
  category: 'general';
  subcategory: 'wellness' | 'entrepreneurship' | 'language' | 'citizenship' | 'aesthetics' | 'extra';
}
// Curriculum Structure Data
const curriculumStructure: CurriculumStructure = {
  general: {
    name: "หมวดวิชาศึกษาทั่วไป",
    required: 30,
    subcategories: {
      wellness: { name: "กลุ่มสาระอยู่ดีมีสุข", required: 3 },
      entrepreneurship: { name: "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ", required: 3 },
      language: { name: "กลุ่มสาระภาษากับการสื่อสาร", required: 13 },
      citizenship: { name: "กลุ่มสาระพลเมืองไทยและพลเมืองโลก", required: 3 },
      aesthetics: { name: "กลุ่มสาระสุนทรียศาสตร์", required: 3 },
      extra: { name: "เลือกเรียนรายวิชาใน 5 กลุ่มสาระ", required: 5 }
    }
  },
  specialized: {
    name: "หมวดวิชาเฉพาะ",
    required: 88,
    subcategories: {
      core: { name: "วิชาแกน", required: 12 },
      required: { name: "วิชาเฉพาะบังคับ", required: 58 },
      elective: { name: "วิชาเฉพาะเลือก", required: 18 }
    }
  },
  freeElective: {
    name: "หมวดวิชาเลือกเสรี",
    required: 6
  }
};



// Main Component
const CourseCurriculumSystem = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [addModalState, setAddModalState] = useState<{
    opened: boolean;
    category: string;
    subcategory?: string;
  }>({
    opened: false,
    category: '',
  });

  // Load courses from localStorage on initial render
  useEffect(() => {
    const savedCourses = localStorage.getItem('selectedCourses');
    if (savedCourses) {
      setSelectedCourses(JSON.parse(savedCourses));
    } else {
      // Set default courses if no saved courses exist
      const defaultCourses = [...defaultRequiredCourses, ...defaultCoreCourses];
      setSelectedCourses(defaultCourses);
      localStorage.setItem('selectedCourses', JSON.stringify(defaultCourses));
    }
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const checkPrerequisites = (courseCode: string) => {
    const course = selectedCourses.find(c => c.code === courseCode);
    if (!course || course.prereq === '-') return true;
    return selectedCourses.some(c => c.code === course.prereq);
  };

  const removeCourse = (code: string) => {
    const dependentCourses = selectedCourses.filter(course =>
      course.prereq === code && selectedCourses.some(c => c.code === course.code)
    );

    if (dependentCourses.length > 0) {
      notifications.show({
        title: 'ไม่สามารถลบรายวิชาได้',
        message: `ไม่สามารถลบรายวิชา ${code} เนื่องจากเป็นวิชาบังคับก่อนของรายวิชาอื่น`,
        color: 'red',
        icon: <IconAlertTriangle size={24} />,
      });
      return;
    }

    const updatedCourses = selectedCourses.filter(course => course.code !== code);
    setSelectedCourses(updatedCourses);

    notifications.show({
      title: 'รายวิชาถูกลบออกจากระบบ',
      message: `รายวิชารหัส ${code} ถูกลบออกจากระบบเรียบร้อยแล้ว`,
      color: 'red',
      icon: <IconTrash size={24} />,
    });
  };

  const addCourse = (course: Course) => {
    if (course.prereq && course.prereq !== '-' && !checkPrerequisites(course.code)) {
      notifications.show({
        title: 'ไม่สามารถเพิ่มรายวิชาได้',
        message: `ไม่สามารถเพิ่มรายวิชา ${course.code} เนื่องจากยังไม่ได้ลงวิชาบังคับก่อน: ${course.prereq}`,
        color: 'red',
        icon: <IconAlertTriangle size={24} />,
      });
      return;
    }
    const updatedCourses = [...selectedCourses, course];
    setSelectedCourses(updatedCourses);

    notifications.show({
      title: 'รายวิชาถูกเพิ่มเข้าสู่ระบบ',
      message: `รายวิชา ${course.name} ถูกเพิ่มเข้าสู่ระบบเรียบร้อยแล้ว`,
      color: 'blue',
      icon: <IconCheck size={24} />,
    });



  };

  // Reset courses to default
  const resetCourses = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะรีเซ็ตรายวิชาเป็นค่าเริ่มต้น?')) {
      const defaultCourses = [...defaultRequiredCourses, ...defaultCoreCourses];
      setSelectedCourses(defaultCourses);
    }
  };

  // Clear all courses
  const clearCourses = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะล้างรายวิชาทั้งหมด?')) {
      setSelectedCourses([]);
    }
  };

  const openAddModal = (category: string, subcategory?: string) => {
    setAddModalState({
      opened: true,
      category,
      subcategory,
    });
  };

  const calculateCredits = (category: string, subcategory?: string) => {
    let filteredCourses = selectedCourses;

    if (subcategory) {
      filteredCourses = filteredCourses.filter(
        course => course.category === category && course.subcategory === subcategory
      );
    } else {
      filteredCourses = filteredCourses.filter(
        course => course.category === category
      );
    }

    return filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  };
  const checkGraduationRequirements = () => {
    let requirements = {
      general: true,
      specialized: true,
      freeElective: true,
      total: true
    };

    // Check general education requirements
    if (curriculumStructure.general.subcategories) {
      Object.entries(curriculumStructure.general.subcategories).forEach(([key, value]) => {
        const credits = calculateCredits('general', key);
        requirements.general = requirements.general && credits >= value.required;
      });
    }

    // Check specialized course requirements
    if (curriculumStructure.specialized.subcategories) {
      Object.entries(curriculumStructure.specialized.subcategories).forEach(([key, value]) => {
        const credits = calculateCredits('specialized', key);
        requirements.specialized = requirements.specialized && credits >= value.required;
      });
    }

    // Check free elective requirements
    const freeElectiveCredits = calculateCredits('freeElective');
    requirements.freeElective = freeElectiveCredits >= curriculumStructure.freeElective.required;

    // Check total credits
    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
    requirements.total = totalCredits >= 120;

    return requirements;
  };



  const handleAutoAdd = (course: Course) => {
    addCourse(course);
  };

  return (
    <Container size="xl" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>
            ระบบตรวจสอบหลักสูตร
          </Title>
          <Text c="dimmed" size="sm">
            หลักสูตรวิทยาศาสตร์บัณฑิต สาขาวิทยาการคอมพิวเตอร์ พ.ศ. 2565
          </Text>
        </div>

        <Group>
          <Button
            variant="light"
            color="blue"
            leftSection={<IconRefresh size={16} />}
            onClick={resetCourses}
          >
            รีเซ็ตเป็นค่าเริ่มต้น
          </Button>
          <Button
            variant="light"
            color="red"
            leftSection={<IconEraser size={16} />}
            onClick={clearCourses}
          >
            ล้างรายวิชาทั้งหมด
          </Button>
        </Group>
      </Group>
      <AddCourseModal
        opened={addModalState.opened}
        onClose={() => setAddModalState({ ...addModalState, opened: false })}
        onAdd={addCourse}
        initialCategory={addModalState.category}
        initialSubcategory={addModalState.subcategory}
        selectedCourses={selectedCourses}
      />

      {/* Credit Summary */}
      <Paper shadow="sm" p="md" mb="xl" withBorder>

        <Group justify="space-between" mb="lg">
          <Group>
            <ThemeIcon
              size={40}
              radius="xl"
              variant="filled"
              color={checkGraduationRequirements().total ? 'green' : 'orange'}
            >
              {checkGraduationRequirements().total ? (
                <IconCheckbox size={24} />
              ) : (
                <IconAlertTriangle size={24} />
              )}
            </ThemeIcon>
            <div>
              <Text fw={700} size="lg">สถานะการจบการศึกษา</Text>
              <Text size="sm" c="dimmed">ตรวจสอบเงื่อนไขการสำเร็จการศึกษา</Text>
            </div>
          </Group>
          <Badge
            size="xl"
            radius="md"
            variant="dot"
            color={checkGraduationRequirements().total ? 'green' : 'orange'}
          >
            {checkGraduationRequirements().total ? 'ครบเกณฑ์' : 'ยังไม่ครบเกณฑ์'}
          </Badge>
        </Group>

        <Divider mb="md" />

        <Stack gap="lg">
          <Paper
            withBorder
            p="md"
            radius="md"
            bg={checkGraduationRequirements().total ? 'green.0' : 'orange.0'}
          >
            <Group>
              {checkGraduationRequirements().total ? (
                <ThemeIcon color="green" variant="light" size="lg" radius="xl">
                  <IconCircleCheck size={20} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="orange" variant="light" size="lg" radius="xl">
                  <IconAlertCircle size={20} />
                </ThemeIcon>
              )}
              <Text fw={500}>
                {checkGraduationRequirements().total
                  ? "คุณมีหน่วยกิตครบตามเกณฑ์การจบการศึกษา"
                  : "คุณยังมีหน่วยกิตไม่ครบตามเกณฑ์การจบการศึกษา"}
              </Text>
            </Group>
          </Paper>

          <div>
            <Text fw={500} mb="sm">เงื่อนไขการจบการศึกษา</Text>
            <Stack gap="sm">
              {[
                {
                  title: 'วิชาศึกษาทั่วไป',
                  required: 30,
                  current: calculateCredits('general'),
                  icon: IconBook,
                  color: 'blue'
                },
                {
                  title: 'วิชาเฉพาะ',
                  required: 88,
                  current: calculateCredits('specialized'),
                  icon: IconCode,
                  color: 'teal'
                },
                {
                  title: 'วิชาเลือกเสรี',
                  required: 6,
                  current: calculateCredits('freeElective'),
                  icon: IconStars,
                  color: 'grape'
                }
              ].map((item) => (
                <Paper key={item.title} withBorder p="md" radius="md">
                  <Group justify="space-between" align="center">
                    <Group>
                      <ThemeIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        color={item.color}
                      >
                        <item.icon size={20} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={500}>{item.title}</Text>
                        <Text size="xs" c="dimmed">ไม่น้อยกว่า {item.required} หน่วยกิต</Text>
                      </div>
                    </Group>

                    <Group gap="xs">
                      <Text fw={500} size="sm">
                        {item.current}/{item.required}
                      </Text>
                      {item.current >= item.required ? (
                        <ThemeIcon color="green" variant="light" radius="xl">
                          <IconCheck size={16} />
                        </ThemeIcon>
                      ) : (
                        <ThemeIcon color="red" variant="light" radius="xl">
                          <IconX size={16} />
                        </ThemeIcon>
                      )}
                    </Group>
                  </Group>

                  <Progress
                    value={(item.current / item.required) * 100}
                    color={item.current >= item.required ? 'green' : 'red'}
                    size="sm"
                    radius="xl"
                    mt="xs"
                  />
                </Paper>
              ))}
            </Stack>
          </div>
        </Stack>
      </Paper>

      {/* Course Lists */}
      <Paper shadow="sm" p="xl" withBorder radius="md">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>รายวิชาที่ลงทะเบียน</Title>
            <Text c="dimmed" size="sm">จัดการรายวิชาตามหมวดหมู่</Text>
          </div>
          <Badge size="xl" radius="md" variant="dot">
            {selectedCourses.length} รายวิชา
          </Badge>
        </Group>
        <Group gap="xl" mb={'xl'}>
          <AutoAddCourseInput
            onAdd={handleAutoAdd}
            existingCourses={selectedCourses}
          />
        </Group>


        <Accordion
          multiple
          defaultValue={['general', 'specialized', 'freeElective']}
          styles={(theme) => ({
            item: {
              borderRadius: theme.radius.md,
              marginBottom: theme.spacing.md,
              border: `1px solid ${theme.colors.gray[3]}`,
              backgroundColor: theme.white,
            },
            control: {
              padding: theme.spacing.md,
            },
            content: {
              padding: theme.spacing.md,
            },
          })}
        >
          {/* General Education Courses */}
          <Accordion.Item value="general">
            <Accordion.Control>
              <Group justify="space-between">
                <Group>
                  <ThemeIcon size="lg" radius="md" color="blue">
                    <IconBook size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500}>หมวดวิชาศึกษาทั่วไป</Text>
                    <Text size="xs" c="dimmed">กลุ่มสาระการเรียนรู้ทั่วไป</Text>
                  </div>
                </Group>
                <Badge size="lg" radius="md" variant="filled" color="blue">
                  {calculateCredits('general')}/30 หน่วยกิต
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {Object.entries(curriculumStructure.general.subcategories!).map(([key, value]) => (
                  <Paper key={key} radius="md" p="md" withBorder>
                    <Group justify="space-between" mb="md">
                      <Group>
                        <ThemeIcon size="md" radius="md" variant="light" color="blue">
                          <IconFolder size={16} />
                        </ThemeIcon>
                        <div>
                          <Text fw={500}>{value.name}</Text>
                          <Group gap="xs">
                            <Text size="xs" c="dimmed">จำนวนวิชา:</Text>
                            <Badge size="sm" variant="dot" color="blue">
                              {selectedCourses.filter(c => c.category === 'general' && c.subcategory === key).length} วิชา
                            </Badge>
                          </Group>
                        </div>
                      </Group>
                      <Group gap="xs">
                        <Badge
                          size="lg"
                          variant={calculateCredits('general', key) >= value.required ? 'filled' : 'outline'}
                          color={calculateCredits('general', key) >= value.required ? 'green' : 'red'}
                        >
                          {calculateCredits('general', key)}/{value.required} หน่วยกิต
                        </Badge>
                        <Button
                          size="xs"
                          variant="light"
                          leftSection={<IconPlus size={14} />}
                          onClick={() => openAddModal('general', key)}
                        >
                          เพิ่มรายวิชา
                        </Button>
                      </Group>
                    </Group>

                    <Table
                      striped
                      highlightOnHover
                      withColumnBorders
                      styles={(theme) => ({
                        table: { borderRadius: '8px', overflow: 'hidden' },
                        th: { backgroundColor: theme.colors.gray[0] }
                      })}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '15%' }}>รหัสวิชา</th>
                          <th style={{ width: '45%' }}>ชื่อวิชา</th>
                          <th style={{ width: '15%' }}>หน่วยกิต</th>
                          <th style={{ width: '15%' }}>วิชาบังคับก่อน</th>
                          <th style={{ width: '10%' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourses
                          .filter(course => course.category === 'general' && course.subcategory === key)
                          .map((course) => (
                            <tr key={course.code}>
                              <td>
                                <Text fw={500}>{course.code}</Text>
                              </td>
                              <td>{course.name}</td>
                              <td style={{
                                textAlign: 'center',
                              }}>
                                <Badge variant="dot" color="blue">
                                  {course.credits}
                                </Badge>
                              </td>
                              <td style={{
                                textAlign: 'center',
                              }}>
                                {course.prereq && course.prereq !== '-' ? (
                                  <Tooltip label="วิชาบังคับก่อน">
                                    <Badge variant="outline" color="blue">
                                      {course.prereq}
                                    </Badge>
                                  </Tooltip>
                                ) : (
                                  <Text size="sm" c="dimmed">-</Text>
                                )}
                              </td>
                              <td style={{
                                textAlign: 'center',
                              }}>
                                <Tooltip label="ลบรายวิชา">
                                  <ActionIcon
                                    color="red"
                                    variant="subtle"
                                    onClick={() => removeCourse(course.code)}
                                  >
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        {selectedCourses.filter(c => c.category === 'general' && c.subcategory === key).length === 0 && (
                          <tr>
                            <td colSpan={5}>
                              <Alert
                                icon={<IconAlertCircle size={16} />}
                                color="gray"
                                variant="light"
                              >
                                ยังไม่มีรายวิชาในกลุ่มนี้
                              </Alert>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Paper>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Specialized Courses */}
          <Accordion.Item value="specialized">
            <Accordion.Control>
              <Group justify="space-between">
                <Group>
                  <ThemeIcon size="lg" radius="md" color="teal">
                    <IconCode size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500}>หมวดวิชาเฉพาะ</Text>
                    <Text size="xs" c="dimmed">วิชาบังคับและวิชาเลือกเฉพาะสาขา</Text>
                  </div>
                </Group>
                <Badge size="lg" radius="md" variant="filled" color="teal">
                  {calculateCredits('specialized')}/88 หน่วยกิต
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {Object.entries(curriculumStructure.specialized.subcategories!).map(([key, value]) => (
                  <Paper key={key} radius="md" p="md" withBorder>
                    <Group justify="space-between" mb="md">
                      <Group>
                        <ThemeIcon size="md" radius="md" variant="light" color="teal">
                          <IconFolder size={16} />
                        </ThemeIcon>
                        <div>
                          <Text fw={500}>{value.name}</Text>
                          <Group gap="xs">
                            <Text size="xs" c="dimmed">จำนวนวิชา:</Text>
                            <Badge size="sm" variant="dot" color="teal">
                              {selectedCourses.filter(c => c.category === 'specialized' && c.subcategory === key).length} วิชา
                            </Badge>
                          </Group>
                        </div>
                      </Group>
                      <Group gap="xs">
                        <Badge
                          size="lg"
                          variant={calculateCredits('specialized', key) >= value.required ? 'filled' : 'outline'}
                          color={calculateCredits('specialized', key) >= value.required ? 'green' : 'red'}
                        >
                          {calculateCredits('specialized', key)}/{value.required} หน่วยกิต
                        </Badge>
                        <Button
                          size="xs"
                          variant="light"
                          leftSection={<IconPlus size={14} />}
                          onClick={() => openAddModal('specialized', key)}
                        >
                          เพิ่มรายวิชา
                        </Button>
                      </Group>
                    </Group>

                    <Table
                      striped
                      highlightOnHover
                      withColumnBorders
                      styles={{
                        table: { borderRadius: '8px', overflow: 'hidden' },
                        thead: { backgroundColor: '#f8f9fa' }
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: '15%' }}>รหัสวิชา</th>
                          <th style={{ width: '45%' }}>ชื่อวิชา</th>
                          <th style={{ width: '15%' }}>หน่วยกิต</th>
                          <th style={{ width: '15%' }}>วิชาบังคับก่อน</th>
                          <th style={{ width: '10%' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourses
                          .filter(course => course.category === 'specialized' && course.subcategory === key)
                          .map((course) => (
                            <tr key={course.code}>
                              <td>
                                <Text fw={500}>{course.code}</Text>
                              </td>
                              <td>{course.name}</td>
                              <td style={{
                                textAlign: 'center',
                              }}>                                <Badge variant="dot" color="teal">
                                  {course.credits}
                                </Badge>
                              </td>
                              <td style={{
                                textAlign: 'center',
                              }}>
                                {course.prereq && course.prereq !== '-' ? (
                                  <Tooltip label="วิชาบังคับก่อน">
                                    <Badge variant="outline" color="teal">
                                      {course.prereq}
                                    </Badge>
                                  </Tooltip>
                                ) : (
                                  <Text size="sm" c="dimmed">-</Text>
                                )}
                              </td>
                              <td style={{
                                textAlign: 'center',
                              }}>
                                <Tooltip label="ลบรายวิชา">
                                  <ActionIcon
                                    color="red"
                                    variant="subtle"
                                    onClick={() => removeCourse(course.code)}
                                  >
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </td>
                            </tr>
                          ))}
                        {selectedCourses.filter(c => c.category === 'specialized' && c.subcategory === key).length === 0 && (
                          <tr>
                            <td colSpan={5}>
                              <Alert
                                icon={<IconAlertCircle size={16} />}
                                color="gray"
                                variant="light"
                              >
                                ยังไม่มีรายวิชาในกลุ่มนี้
                              </Alert>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Paper>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Free Elective Courses */}
          <Accordion.Item value="freeElective">
            <Accordion.Control>
              <Group justify="space-between">
                <Group>
                  <ThemeIcon size="lg" radius="md" color="grape">
                    <IconStars size={20} />
                  </ThemeIcon>
                  <div>
                    <Text fw={500}>หมวดวิชาเลือกเสรี</Text>
                    <Text size="xs" c="dimmed">วิชาที่เลือกเรียนได้จากทุกคณะ</Text>
                  </div>
                </Group>
                <Badge size="lg" radius="md" variant="filled" color="grape">
                  {calculateCredits('freeElective')}/6 หน่วยกิต
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Paper radius="md" p="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Group>
                    <ThemeIcon size="md" radius="md" variant="light" color="grape">
                      <IconFolder size={16} />
                    </ThemeIcon>
                    <div>
                      <Text fw={500}>วิชาเลือกเสรี</Text>
                      <Group gap="xs">
                        <Text size="xs" c="dimmed">จำนวนวิชา:</Text>
                        <Badge size="sm" variant="dot" color="grape">
                          {selectedCourses.filter(c => c.category === 'freeElective').length} วิชา
                        </Badge>
                      </Group>
                    </div>
                  </Group>
                  <Group gap="xs">
                    <Badge
                      size="lg"
                      variant={calculateCredits('freeElective') >= 6 ? 'filled' : 'outline'}
                      color={calculateCredits('freeElective') >= 6 ? 'green' : 'red'}
                    >
                      {calculateCredits('freeElective')}/6 หน่วยกิต
                    </Badge>
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<IconPlus size={14} />}
                      onClick={() => openAddModal('freeElective')}
                    >
                      เพิ่มรายวิชา
                    </Button>
                  </Group>
                </Group>

                <Table
                  striped
                  highlightOnHover
                  withColumnBorders
                  styles={{
                    table: { borderRadius: '8px', overflow: 'hidden' },
                    thead: { backgroundColor: '#f8f9fa' }
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: '15%' }}>รหัสวิชา</th>
                      <th style={{ width: '45%' }}>ชื่อวิชา</th>
                      <th style={{ width: '15%' }}>หน่วยกิต</th>
                      <th style={{ width: '15%' }}>วิชาบังคับก่อน</th>
                      <th style={{ width: '10%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCourses
                      .filter(course => course.category === 'freeElective')
                      .map((course) => (
                        <tr key={course.code}>
                          <td>
                            <Text fw={500}>{course.code}</Text>
                          </td>
                          <td>{course.name}</td>
                          <td style={{
                            textAlign: 'center',
                          }}>
                            <Badge variant="dot" color="grape">
                              {course.credits}
                            </Badge>
                          </td>
                          <td style={{
                            textAlign: 'center',
                          }}>
                            {course.prereq && course.prereq !== '-' ? (
                              <Tooltip label="วิชาบังคับก่อน">
                                <Badge variant="outline" color="grape">
                                  {course.prereq}
                                </Badge>
                              </Tooltip>
                            ) : (
                              <Text size="sm" c="dimmed">-</Text>
                            )}
                          </td>
                          <td style={{
                            textAlign: 'center',
                          }}>
                            <Tooltip label="ลบรายวิชา">
                              <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => removeCourse(course.code)}
                              >
                                <IconTrash size={16} />
                              </ActionIcon>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                    {selectedCourses.filter(c => c.category === 'freeElective').length === 0 && (
                      <tr>
                        <td colSpan={5}>
                          <Alert
                            icon={<IconAlertCircle size={16} />}
                            color="gray"
                            variant="light"
                          >
                            ยังไม่มีรายวิชาในหมวดนี้
                          </Alert>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Paper>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
      <Container size="xl" mt={'xl'}>
        <Flex
          justify="center"
          align="center"
          direction="row"
          gap="xs"
        >
          <Text size="sm" c="dimmed">
            Developed with
          </Text>
          <IconHeart size={16} style={{ color: '#ff6b6b' }} />
          <Text size="sm" c="dimmed">
            by
          </Text>
          <Anchor
            href="https://github.com/beerth21624"
            target="_blank"
            c="blue"
            fw={500}
            style={{ textDecoration: 'none' }}
          >
            Beer Do-San
          </Anchor>
          <Anchor
            href="https://github.com/beerth21624"
            target="_blank"
            c="dimmed"
            style={{ textDecoration: 'none' }}
          >
          </Anchor>
        </Flex>
      </Container>

    </Container >
  );
};

export default CourseCurriculumSystem;