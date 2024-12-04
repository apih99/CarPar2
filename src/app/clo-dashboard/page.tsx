'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CLOPLOMapping from './components/CLOPLOMapping';
import CLOAssessment from './components/CLOAssessment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CLODashboard() {
  const courseInfo = {
    programName: 'BACHELOR DEGREE OF OPERATIONS RESEARCH WITH DATA SCIENCE (ZC33)',
    courseName: 'CALCULUS',
    courseCode: 'TMM 3313',
    lecturerName: 'DR. FAZILATULAILI BINTI ALI',
    semester: 'I',
    academicSession: '2020/2021',
    intake: '2020',
    previousFeedback: 'NONE',
  };

  const cloData = [
    { id: 'CLO1', description: 'Use the properties of functions, limits and continuity, techniques of differentiation and integration.' },
    { id: 'CLO2', description: 'Solve problems limits, continuity, derivatives, and integrals.' },
    { id: 'CLO3', description: 'Sketch the graph of a polynomial or rational function using the technique learned in calculus.' },
  ];

  const chartData = {
    labels: ['CLO1', 'CLO2', 'CLO3'],
    datasets: [
      {
        label: 'Achievement',
        data: [0.84, 0.83, 0.82],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
      },
      {
        label: 'Target',
        data: [0.50, 0.50, 0.50],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'CLO Assessment',
      },
    },
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Course Information Card */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Course Assessment Report (CAR)</h1>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(courseInfo).map(([key, value]) => (
            <div key={key} className="flex">
              <span className="font-semibold min-w-[200px] capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* CLO Table */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Course Learning Outcomes (CLO)</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">CLO</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cloData.map((clo) => (
              <TableRow key={clo.id}>
                <TableCell className="font-medium">{clo.id}</TableCell>
                <TableCell>{clo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* CLO-PLO Mapping */}
      <CLOPLOMapping />

      {/* Grade Distribution */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Grade Distribution</h2>
        <Table>
          <TableHeader>
            <TableRow>
              {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'E'].map((grade) => (
                <TableHead key={grade} className="text-center">{grade}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-center">25</TableCell>
              <TableCell className="text-center">8</TableCell>
              <TableCell className="text-center">1</TableCell>
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
              <TableCell className="text-center">0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      {/* CLO Assessment Chart */}
      <Card className="p-6">
        <div className="h-[400px]">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </Card>

      {/* CLO Assessment Details */}
      <CLOAssessment />
    </div>
  );
} 