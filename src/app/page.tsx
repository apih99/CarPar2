'use client';

import { Card, Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <Title level={1} style={{ textAlign: 'center' }}>
        Course Assessment Management System
      </Title>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        maxWidth: '1200px',
        margin: '2rem auto'
      }}>
        <Link href="/mark-entry" style={{ textDecoration: 'none' }}>
          <Card hoverable>
            <Title level={3}>Mark Entry</Title>
            <p>Input and manage student marks</p>
          </Card>
        </Link>

        <Link href="/clo-dashboard" style={{ textDecoration: 'none' }}>
          <Card hoverable>
            <Title level={3}>CLO Dashboard</Title>
            <p>View Course Learning Outcomes</p>
          </Card>
        </Link>

        <Link href="/plo-dashboard" style={{ textDecoration: 'none' }}>
          <Card hoverable>
            <Title level={3}>PLO Dashboard</Title>
            <p>Track Program Learning Outcomes</p>
          </Card>
        </Link>

        <Link href="/settings" style={{ textDecoration: 'none' }}>
          <Card hoverable>
            <Title level={3}>Settings</Title>
            <p>Configure system parameters</p>
          </Card>
        </Link>
      </div>
    </div>
  );
} 