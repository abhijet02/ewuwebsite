"use client";

import { Office } from "@lib/services/office/office.service.type";
import { Department } from "@lib/services/department/department.service.type";
import "./Header.scss";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedOfficeId: number;
  setSelectedOfficeId: (id: number) => void;
  offices: Office[];
  selectedDepartmentId: number;
  setSelectedDepartmentId: (id: number) => void;
  departments: Department[];
  onClear: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedOfficeId,
  setSelectedOfficeId,
  offices,
  selectedDepartmentId,
  setSelectedDepartmentId,
  departments,
  onClear,
}) => {
  return (
    <div className="job-list-header">
      <div className="job-list-content">
        <p className="job-list-subtitle">Careers</p>
        <p className="job-list-title">
          Grow with one of Bangladesh’s finest institutions
        </p>
      </div>

      <div className="job-list-search-bar">
        {/* Search input */}
        <input
          className="form-control"
          placeholder="Job Title or Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Office filter */}
        <select
          className="form-select"
          value={selectedOfficeId}
          onChange={(e) => setSelectedOfficeId(Number(e.target.value))}
        >
          <option value={0}>All Offices</option>
          {offices.map((office) => (
            <option key={office.id} value={office.id}>
              {office.title}
            </option>
          ))}
        </select>

        {/* Department filter */}
        <select
          className="form-select"
          value={selectedDepartmentId}
          onChange={(e) => setSelectedDepartmentId(Number(e.target.value))}
        >
          <option value={0}>All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        {/* Clear button */}
        <button className="job-filter-clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Header;
