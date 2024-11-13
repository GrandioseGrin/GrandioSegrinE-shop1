import React from "react";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg- bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <a
          href={link}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
