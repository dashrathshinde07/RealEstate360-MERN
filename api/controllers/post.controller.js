import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        PostDetail: true,
        user: {
          username: true,
          avatar: true,
        },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to get post" });
  }
};

export const addPost = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
        PostDetail: {
          create: postDetail,
        },
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Failed to add post", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to updatPost" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Faild to deletePost" });
  }
};
