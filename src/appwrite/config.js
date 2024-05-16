import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("65f5a701afb1dc7bf5c4");
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        "65f5a895067e93c41488",
        "65f5a8a96013b07c3352",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite Error : createPost : error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        '65f5a895067e93c41488',
        "65f5a8a96013b07c3352",
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite : error : updatePost : ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        '65f5a895067e93c41488',
        "65f5a8a96013b07c3352",
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite : deletePost : error : ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
       "65f5a895067e93c41488",
        "65f5a8a96013b07c3352",
        slug
      );
    } catch (error) {
      console.log("appwrite : getPost : error : ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
       "65f5a895067e93c41488",
       "65f5a8a96013b07c3352",
        queries
      );
    } catch (error) {
      console.log("appwrite : getPost : error : ", error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
          "65f5aadabb2945d933e7",
          ID.unique(),
          file
      )
  } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false
  }
  }

  async deleteFile(Id) {
    try {
      await this.databases.deleteFile("65f5aadabb2945d933e7", Id);
      return true;
    } catch (error) {
      console.log("appwrite : deleteFile : error : ", error);
      return false;
    }
  }

  async getFilePreview(Id) {
    try
    {
      const src = this.bucket.getFilePreview("65f5aadabb2945d933e7", Id)
      console.log(src.href);
      return src.href;
    }
    catch(error){
      console.log("appwrite: getFilePreview : error : ", error);
    }
  }
}

const service = new Service();

export default service;
