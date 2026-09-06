"use client";

const ArchiveAllList = ({ data }) => {
  return (
    <div>
      {data?.map((item, index) => (
        <a key={index} href={item.link}>
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default ArchiveAllList;
