import React, { createContext, useState } from "react";
import { Grid, Box, Typography, Divider } from "@mui/material";
import Markdown from "../Markdown";
import ShareButtons from "../ShareButtons";
import Image from "next/image";

export interface postObject {
  id: string;
  title: string;
  body?: string;
  featuredImage: any;
  imgUrl?: string;
}

interface MainPostDetailProps {
  post: postObject;
}

export type ThemeContextState = {
  codeStyle: string;
  updateCodeStyle: () => void;
};

const contextDefaultValues: ThemeContextState = {
  codeStyle: "dark",
  updateCodeStyle: () => {},
};

export const ThemeContext =
  createContext<ThemeContextState>(contextDefaultValues);

export default function MainPostDetail(props: MainPostDetailProps) {
  const { post } = props;

  const [codeStyle, setCodeStyle] = useState<string>(
    contextDefaultValues.codeStyle
  );
  const updateCodeStyle = () => {
    setCodeStyle(codeStyle === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        codeStyle,
        updateCodeStyle,
      }}
    >
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          "& .markdown": {
            py: 3,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            mr: { xs: 0, md: 2 },
            backgroundColor: "#ebf5fb",
            boxShadow: 2,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Image
              src={post.featuredImage.url}
              layout="responsive"
              alt="アイキャッチ画像"
              height={640}
              width={1200}
            />
          </Box>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Divider />
          <Markdown className="markdown">{post.body || "本文無し"}</Markdown>
          <ShareButtons
            title={post.title}
            url={`https://works.paths-are.com/paths-are-tech-blog-template/post/${post.id}`}
          />
        </Box>
      </Grid>
    </ThemeContext.Provider>
  );
}
