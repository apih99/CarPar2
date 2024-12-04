import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check } from 'lucide-react';

const ploHeaders = [
  { id: 'PLO1', name: 'Knowledge' },
  { id: 'PLO2', name: 'Cognitive Skills' },
  { id: 'PLO3', name: 'Practical Skills' },
  { id: 'PLO4', name: 'Interpersonal Skills' },
  { id: 'PLO5', name: 'Communication Skills' },
  { id: 'PLO6', name: 'Digital & Numeracy Skills' },
  { id: 'PLO7', name: 'Leadership, Autonomy & Responsibility Skills' },
  { id: 'PLO8', name: 'Personal Skills' },
  { id: 'PLO9', name: 'Entrepreneurial Skills' },
  { id: 'PLO10', name: 'Ethics & Professionalism' },
];

const mappingData = [
  { clo: 'CLO1', mappings: [true, false, false, false, false, false, false, false, false, false] },
  { clo: 'CLO2', mappings: [false, true, false, false, false, false, false, false, false, false] },
  { clo: 'CLO3', mappings: [false, false, false, false, false, true, false, false, false, false] },
];

export default function CLOPLOMapping() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">CLO-PLO Mapping</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">CLO</TableHead>
              {ploHeaders.map((plo) => (
                <TableHead key={plo.id} className="text-center min-w-[120px]">
                  <div>{plo.id}</div>
                  <div className="text-xs font-normal">{plo.name}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mappingData.map((row) => (
              <TableRow key={row.clo}>
                <TableCell className="font-medium">{row.clo}</TableCell>
                {row.mappings.map((mapped, index) => (
                  <TableCell key={index} className="text-center">
                    {mapped && <Check className="mx-auto h-4 w-4 text-green-500" />}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
} 