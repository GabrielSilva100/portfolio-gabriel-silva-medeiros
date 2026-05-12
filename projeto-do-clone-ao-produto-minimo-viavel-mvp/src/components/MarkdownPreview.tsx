import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { motion } from 'motion/react';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content, className }) => {
  return (
    <div className={className}>
      <div className="markdown-body prose prose-slate max-w-none dark:prose-invert">
        <Markdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            img: ({ node, src, alt, title, ...props }) => (
              <motion.img
                src={src}
                alt={alt}
                title={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotate: 0.5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                referrerPolicy="no-referrer"
                className="rounded-2xl cursor-zoom-in"
              />
            )
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};
