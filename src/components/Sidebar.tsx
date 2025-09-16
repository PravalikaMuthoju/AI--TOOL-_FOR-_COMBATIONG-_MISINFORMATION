import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  TrendingUp, 
  GraduationCap,
  BarChart3
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Check News', href: '/check', icon: Search },
  { name: 'Fact-Check Reports', href: '/reports', icon: FileText },
  { name: 'Trends', href: '/trends', icon: TrendingUp },
  { name: 'Education', href: '/education', icon: GraduationCap },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-md border-r border-white/20 pt-20 z-40">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100/50 hover:text-blue-600'
              )}
            >
              <item.icon className={cn(
                'h-5 w-5',
                isActive ? 'text-white' : 'text-gray-500'
              )} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-900">Quick Stats</span>
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Checks Today:</span>
            <span className="font-medium">127</span>
          </div>
          <div className="flex justify-between">
            <span>Accuracy:</span>
            <span className="font-medium text-green-600">94.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
}