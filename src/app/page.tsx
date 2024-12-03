'use client';

import { useState } from 'react';
import { Table, Input, Card, Typography, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface StudentMarks {
  key: string;
  no: number;
  name: string;
  quiz1: number;
  quiz2: number;
  assignment1: number;
  test1: number;
  final1: number;
  final2: number;
  final3: number;
  total: number;
  grade: string;
}

const calculateGrade = (total: number): string => {
  if (total >= 90) return 'A+';
  if (total >= 85) return 'A';
  if (total >= 80) return 'A-';
  if (total >= 75) return 'B+';
  if (total >= 70) return 'B';
  if (total >= 65) return 'B-';
  if (total >= 60) return 'C+';
  if (total >= 55) return 'C';
  if (total >= 50) return 'C-';
  return 'F';
};

export default function Home() {
  const [data, setData] = useState<StudentMarks[]>([
    {
      key: '1',
      no: 1,
      name: '',
      quiz1: 0,
      quiz2: 0,
      assignment1: 0,
      test1: 0,
      final1: 0,
      final2: 0,
      final3: 0,
      total: 0,
      grade: 'F'
    },
  ]);

  const handleMarkChange = (key: string, field: string, value: string) => {
    const newValue = parseFloat(value) || 0;
    setData(prevData => 
      prevData.map(item => {
        if (item.key === key) {
          const updatedItem = {
            ...item,
            [field]: newValue
          };
          // Calculate total
          const total = 
            (updatedItem.quiz1 + updatedItem.quiz2) * 0.1 + // 10% each
            updatedItem.assignment1 * 0.2 + // 20%
            updatedItem.test1 * 0.2 + // 20%
            (updatedItem.final1 + updatedItem.final2 + updatedItem.final3) * 0.4/3; // 40% total
          
          updatedItem.total = total;
          updatedItem.grade = calculateGrade(total);
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleNameChange = (key: string, value: string) => {
    setData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, name: value } : item
      )
    );
  };

  const addStudent = () => {
    const newStudent: StudentMarks = {
      key: (data.length + 1).toString(),
      no: data.length + 1,
      name: '',
      quiz1: 0,
      quiz2: 0,
      assignment1: 0,
      test1: 0,
      final1: 0,
      final2: 0,
      final3: 0,
      total: 0,
      grade: 'F'
    };
    setData([...data, newStudent]);
  };

  const removeStudent = (key: string) => {
    setData(prevData => {
      const newData = prevData.filter(item => item.key !== key);
      return newData.map((item, index) => ({
        ...item,
        no: index + 1,
        key: (index + 1).toString()
      }));
    });
  };

  const columns: ColumnsType<StudentMarks> = [
    { 
      title: 'No.',
      dataIndex: 'no',
      width: 60,
      fixed: 'left'
    },
    { 
      title: 'Name of Student',
      dataIndex: 'name',
      width: 250,
      fixed: 'left',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleNameChange(record.key, e.target.value)}
          placeholder="Enter student name"
        />
      )
    },
    {
      title: 'Quiz (20%)',
      children: [
        {
          title: '1 (10%)',
          dataIndex: 'quiz1',
          width: 100,
          render: (text, record) => (
            <Input
              type="number"
              value={text}
              onChange={(e) => handleMarkChange(record.key, 'quiz1', e.target.value)}
              min={0}
              max={10}
            />
          ),
        },
        {
          title: '2 (10%)',
          dataIndex: 'quiz2',
          width: 100,
          render: (text, record) => (
            <Input
              type="number"
              value={text}
              onChange={(e) => handleMarkChange(record.key, 'quiz2', e.target.value)}
              min={0}
              max={10}
            />
          ),
        }
      ]
    },
    {
      title: 'Assignment (20%)',
      dataIndex: 'assignment1',
      width: 120,
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleMarkChange(record.key, 'assignment1', e.target.value)}
          min={0}
          max={20}
        />
      ),
    },
    {
      title: 'Test (20%)',
      dataIndex: 'test1',
      width: 100,
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleMarkChange(record.key, 'test1', e.target.value)}
          min={0}
          max={20}
        />
      ),
    },
    {
      title: 'Final (40%)',
      children: [
        {
          title: '1',
          dataIndex: 'final1',
          width: 80,
          render: (text, record) => (
            <Input
              type="number"
              value={text}
              onChange={(e) => handleMarkChange(record.key, 'final1', e.target.value)}
              min={0}
              max={40}
            />
          ),
        },
        {
          title: '2',
          dataIndex: 'final2',
          width: 80,
          render: (text, record) => (
            <Input
              type="number"
              value={text}
              onChange={(e) => handleMarkChange(record.key, 'final2', e.target.value)}
              min={0}
              max={40}
            />
          ),
        },
        {
          title: '3',
          dataIndex: 'final3',
          width: 80,
          render: (text, record) => (
            <Input
              type="number"
              value={text}
              onChange={(e) => handleMarkChange(record.key, 'final3', e.target.value)}
              min={0}
              max={40}
            />
          ),
        },
      ],
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: 80,
      render: (text) => text.toFixed(2),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: 80,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => removeStudent(record.key)}
          danger
        />
      ),
    },
  ];

  const summary = (currentData: readonly StudentMarks[]) => {
    const totalStudents = currentData.length;
    
    // Calculate totals and averages
    const totals = {
      quiz1: currentData.reduce((acc, curr) => acc + curr.quiz1, 0),
      quiz2: currentData.reduce((acc, curr) => acc + curr.quiz2, 0),
      assignment1: currentData.reduce((acc, curr) => acc + curr.assignment1, 0),
      test1: currentData.reduce((acc, curr) => acc + curr.test1, 0),
      final1: currentData.reduce((acc, curr) => acc + curr.final1, 0),
      final2: currentData.reduce((acc, curr) => acc + curr.final2, 0),
      final3: currentData.reduce((acc, curr) => acc + curr.final3, 0),
      total: currentData.reduce((acc, curr) => acc + curr.total, 0),
    };

    const averages = {
      quiz1: totals.quiz1 / totalStudents,
      quiz2: totals.quiz2 / totalStudents,
      assignment1: totals.assignment1 / totalStudents,
      test1: totals.test1 / totalStudents,
      final1: totals.final1 / totalStudents,
      final2: totals.final2 / totalStudents,
      final3: totals.final3 / totalStudents,
      total: totals.total / totalStudents,
    };

    // Calculate percentages (assuming max marks: quiz=10, assignment=20, test=20, final=40)
    const percentages = {
      quiz1: (totals.quiz1 / (totalStudents * 10)) * 100,
      quiz2: (totals.quiz2 / (totalStudents * 10)) * 100,
      assignment1: (totals.assignment1 / (totalStudents * 20)) * 100,
      test1: (totals.test1 / (totalStudents * 20)) * 100,
      final1: (totals.final1 / (totalStudents * 40)) * 100,
      final2: (totals.final2 / (totalStudents * 40)) * 100,
      final3: (totals.final3 / (totalStudents * 40)) * 100,
    };

    // Calculate normalized scores (using min-max normalization)
    const normalize = (value: number, max: number) => {
      return value === 0 ? 0 : (value / (totalStudents * max)).toFixed(2);
    };

    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>Overall Total</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>{totals.quiz1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={3}>{totals.quiz2.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>{totals.assignment1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={5}>{totals.test1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={6}>{totals.final1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={7}>{totals.final2.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={8}>{totals.final3.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={9}>{totals.total.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
          <Table.Summary.Cell index={11}></Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>No. of Students</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={3}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={5}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={6}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={7}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={8}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={9}>{totalStudents}</Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
          <Table.Summary.Cell index={11}></Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>Average</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>{averages.quiz1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={3}>{averages.quiz2.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>{averages.assignment1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={5}>{averages.test1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={6}>{averages.final1.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={7}>{averages.final2.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={8}>{averages.final3.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={9}>{averages.total.toFixed(2)}</Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
          <Table.Summary.Cell index={11}></Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>Percentage</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>{percentages.quiz1.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={3}>{percentages.quiz2.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>{percentages.assignment1.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={5}>{percentages.test1.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={6}>{percentages.final1.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={7}>{percentages.final2.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={8}>{percentages.final3.toFixed(0)}%</Table.Summary.Cell>
          <Table.Summary.Cell index={9}></Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
          <Table.Summary.Cell index={11}></Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={2}>Normalize</Table.Summary.Cell>
          <Table.Summary.Cell index={2}>{normalize(totals.quiz1, 10)}</Table.Summary.Cell>
          <Table.Summary.Cell index={3}>{normalize(totals.quiz2, 10)}</Table.Summary.Cell>
          <Table.Summary.Cell index={4}>{normalize(totals.assignment1, 20)}</Table.Summary.Cell>
          <Table.Summary.Cell index={5}>{normalize(totals.test1, 20)}</Table.Summary.Cell>
          <Table.Summary.Cell index={6}>{normalize(totals.final1, 40)}</Table.Summary.Cell>
          <Table.Summary.Cell index={7}>{normalize(totals.final2, 40)}</Table.Summary.Cell>
          <Table.Summary.Cell index={8}>{normalize(totals.final3, 40)}</Table.Summary.Cell>
          <Table.Summary.Cell index={9}></Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
          <Table.Summary.Cell index={11}></Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  return (
    <main className="min-h-screen p-8">
      <Card>
        <Space className="w-full justify-between mb-4">
          <Title level={2}>Mark Entry System</Title>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={addStudent}
          >
            Add Student
          </Button>
        </Space>
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={false}
          bordered
          summary={summary}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </main>
  );
} 