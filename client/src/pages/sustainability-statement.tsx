import React from 'react';
import { Metadata } from '@/components/Metadata';
import PublicLayout from '@/layouts/PublicLayout';
import { SustainabilityStatementBuilder } from '@/components/sustainability/SustainabilityStatementBuilder';

export default function SustainabilityStatementPage() {
  return (
    <PublicLayout>
      <Metadata
        title="Sustainability Statement Builder | 2-Page Reports"
        description="Create professional 2-page sustainability statements with our customizable templates. Choose from Corporate Snapshot, Visual Impact Report, or ESG Strategy Brief formats."
      />
      <SustainabilityStatementBuilder />
    </PublicLayout>
  );
}