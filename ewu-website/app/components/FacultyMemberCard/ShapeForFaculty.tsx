"use client";
interface ShapeForFacultyProps {
  department: string;
}
const ShapeForFaculty: React.FC<ShapeForFacultyProps> = ({ department }) => {
  return (
    <div>
      <div
        style={{
          padding: "16px",
          background: "#aa4a44",
          marginBottom: "32px",
          borderRadius: "12px",
          color: "#FFF",
        }}
      >
        <h4> Dean </h4>
        <h6 style={{textAlign:"left"}}>{department}</h6>
      </div>
    </div>
  );
};

export default ShapeForFaculty;
