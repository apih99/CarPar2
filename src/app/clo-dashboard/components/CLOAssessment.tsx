import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CLOData {
  clo1: number | null;
  clo2: number | null;
  clo3: number | null;
}

interface AssessmentData {
  quiz: CLOData[];
  assignment: CLOData[];
  test: CLOData[];
  finalExam: CLOData;
  achievement: CLOData;
  targetKPI: CLOData;
  assessment: {
    clo1: string;
    clo2: string;
    clo3: string;
  };
}

const assessmentData: AssessmentData = {
  quiz: [
    { clo1: 1, clo2: null, clo3: 0.99 },
    { clo1: 0.99, clo2: null, clo3: null },
    { clo1: null, clo2: null, clo3: null },
  ],
  assignment: [
    { clo1: null, clo2: 0.93, clo3: null },
    { clo1: null, clo2: null, clo3: null },
    { clo1: null, clo2: null, clo3: null },
  ],
  test: [
    { clo1: null, clo2: 0.77, clo3: null },
    { clo1: null, clo2: null, clo3: null },
  ],
  finalExam: { clo1: 0.69, clo2: 0.80, clo3: 0.65 },
  achievement: { clo1: 0.84, clo2: 0.83, clo3: 0.82 },
  targetKPI: { clo1: 0.50, clo2: 0.50, clo3: 0.50 },
  assessment: { clo1: 'Achieve', clo2: 'Achieve', clo3: 'Achieve' },
};

export default function CLOAssessment() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">CLO Assessment Details</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Assessment</TableHead>
            <TableHead className="text-center">CLO1</TableHead>
            <TableHead className="text-center">CLO2</TableHead>
            <TableHead className="text-center">CLO3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Quiz rows */}
          {assessmentData.quiz.map((quiz, index) => (
            <TableRow key={`quiz-${index + 1}`}>
              <TableCell>{index === 0 ? 'Quiz' : ''} {index + 1}</TableCell>
              <TableCell className="text-center">{quiz.clo1?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{quiz.clo2?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{quiz.clo3?.toFixed(2) || '-'}</TableCell>
            </TableRow>
          ))}

          {/* Assignment rows */}
          {assessmentData.assignment.map((assignment, index) => (
            <TableRow key={`assignment-${index + 1}`}>
              <TableCell>{index === 0 ? 'Assignment' : ''} {index + 1}</TableCell>
              <TableCell className="text-center">{assignment.clo1?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{assignment.clo2?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{assignment.clo3?.toFixed(2) || '-'}</TableCell>
            </TableRow>
          ))}

          {/* Test rows */}
          {assessmentData.test.map((test, index) => (
            <TableRow key={`test-${index + 1}`}>
              <TableCell>{index === 0 ? 'Test' : ''} {index + 1}</TableCell>
              <TableCell className="text-center">{test.clo1?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{test.clo2?.toFixed(2) || '-'}</TableCell>
              <TableCell className="text-center">{test.clo3?.toFixed(2) || '-'}</TableCell>
            </TableRow>
          ))}

          {/* Final Examination */}
          <TableRow>
            <TableCell>Final Examination</TableCell>
            <TableCell className="text-center">{assessmentData.finalExam.clo1?.toFixed(2)}</TableCell>
            <TableCell className="text-center">{assessmentData.finalExam.clo2?.toFixed(2)}</TableCell>
            <TableCell className="text-center">{assessmentData.finalExam.clo3?.toFixed(2)}</TableCell>
          </TableRow>

          {/* Achievement */}
          <TableRow className="bg-gray-50">
            <TableCell className="font-semibold">ACHIEVEMENT</TableCell>
            <TableCell className="text-center font-semibold">{assessmentData.achievement.clo1?.toFixed(2)}</TableCell>
            <TableCell className="text-center font-semibold">{assessmentData.achievement.clo2?.toFixed(2)}</TableCell>
            <TableCell className="text-center font-semibold">{assessmentData.achievement.clo3?.toFixed(2)}</TableCell>
          </TableRow>

          {/* Target KPI */}
          <TableRow>
            <TableCell className="font-semibold">TARGET KPI</TableCell>
            <TableCell className="text-center">{assessmentData.targetKPI.clo1?.toFixed(2)}</TableCell>
            <TableCell className="text-center">{assessmentData.targetKPI.clo2?.toFixed(2)}</TableCell>
            <TableCell className="text-center">{assessmentData.targetKPI.clo3?.toFixed(2)}</TableCell>
          </TableRow>

          {/* Assessment */}
          <TableRow>
            <TableCell className="font-semibold">ASSESSMENT</TableCell>
            <TableCell className="text-center text-green-600">{assessmentData.assessment.clo1}</TableCell>
            <TableCell className="text-center text-green-600">{assessmentData.assessment.clo2}</TableCell>
            <TableCell className="text-center text-green-600">{assessmentData.assessment.clo3}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
} 