import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AqiOverviewCard } from '@/components/AqiOverviewCard';
import { AirQualityData } from '@/types/air';

describe('AqiOverviewCard Component', () => {
  const mockSevereData: AirQualityData = {
    city: 'Delhi NCR',
    country: 'India',
    aqi: 458,
    category: 'Severe',
    categoryHi: 'गंभीर (Severe)',
    dominantPollutant: 'PM2.5',
    timestamp: new Date().toISOString(),
    isSimulatedDemo: false,
    pollutants: {
      pm2_5: 320,
      pm10: 480,
      no2: 85,
      so2: 28,
      co: 2.8,
      o3: 45,
    },
    weather: {
      temperature: 16,
      humidity: 84,
      windSpeed: 1.1,
      windDirection: 310,
      pressure: 1016,
      isDaytime: true,
      inversionRisk: 'Critical High',
      ventilationStatus: 'SEAL_WINDOWS_NOW',
      bestVentilationWindow: '1:30 PM – 3:30 PM',
    },
    hourlyForecast: [],
  };

  it('renders AQI value, city, and dominant pollutant', () => {
    render(<AqiOverviewCard data={mockSevereData} language="en" />);

    expect(screen.getByText('458')).toBeInTheDocument();
    expect(screen.getByText('Delhi NCR')).toBeInTheDocument();
    expect(screen.getByText('PM2.5')).toBeInTheDocument();
  });

  it('renders the Berkeley Earth Cigarettes Equivalent accurately', () => {
    render(<AqiOverviewCard data={mockSevereData} language="en" />);

    // 320 / 22 = 14.545 -> ~14.5
    expect(screen.getByText('~14.5')).toBeInTheDocument();
    expect(screen.getByText('Berkeley Earth')).toBeInTheDocument();
  });

  it('displays the Ventilation Window banner with seal warning', () => {
    render(<AqiOverviewCard data={mockSevereData} language="en" />);

    expect(screen.getByText(/1:30 PM – 3:30 PM/i)).toBeInTheDocument();
  });

  it('generates a valid one-tap WhatsApp share link', () => {
    render(<AqiOverviewCard data={mockSevereData} language="en" />);

    const shareLink = screen.getByLabelText(/Share Family Smog Advisory Card on WhatsApp/i);
    expect(shareLink).toBeInTheDocument();

    const href = shareLink.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href).toContain('https://wa.me/?text=');
    expect(href).toContain(encodeURIComponent('DELHI NCR'));
    expect(href).toContain('458');
  });

  it('renders in Hindi when language is set to "hi"', () => {
    render(<AqiOverviewCard data={mockSevereData} language="hi" />);

    expect(screen.getByText('दिल्ली एनसीआर')).toBeInTheDocument();
    expect(screen.getByText('गंभीर (Severe)')).toBeInTheDocument();
  });
});
