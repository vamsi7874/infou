import axios from "axios";
import { findAll, findOne, insertOne } from "../common/mongo";
import moment from "moment";

export const getNewData = async (req: any, res: any) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const topics = ["stocks", "ai", "global", "tariffs", "gold", "india"];

    const responsePromises = topics.map((topic) =>
      axios.get(
        `https://newsapi.org/v2/everything?q=${topic}&from=${today}&to=${today}&sortBy=popularity&apiKey=aec6e06109574672b5e6fc9b6d520116`
      )
    );

    const resolvedResponses = await Promise.all(responsePromises);

    const insertPromises = resolvedResponses.map((response, index) =>
      insertOne("news", {
        topic: topics[index],
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        date: moment().unix(),
      })
    );

    await Promise.all(insertPromises);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
  }
};

export const fetchNewsDataToday = async (req: any, res: any) => {
  try {
    const topics = ["stocks", "ai", "global", "tariffs", "gold", "india"];
    const today = moment().unix()

    const responsePromises = topics.map((topic) =>
     findAll('news','topic',topic)
    );

    const responses :any = await Promise.all(responsePromises);
    const topicWiseData: Record<string, any[]> = {};

    responses.forEach((response, index) => {
      const topic = topics[index];
      topicWiseData[topic] = response.data.articles || [];
    });

  
    return({
      success: true,
      date: today,
      data: topicWiseData,
    });
  } catch (e: any) {
    console.error("Error fetching news:", e.message);
    return({
      success: false,
      message: "Failed to fetch news data",
      error: e.message,
    });
  }
};
