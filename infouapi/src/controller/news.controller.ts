import axios from "axios";
import { findAll, findOne, insertOne } from "../common/mongo";
import moment from "moment";
type feddMode = {
  apiToken: string;
  topic: string;
};

export const getNewData = async (req: any, res: any) => {
  try {
    const today = moment().subtract(1, "days").format("YYYY-MM-DD");
    const topics: feddMode[] = [
      { apiToken: "Stocks", topic: "stocks" },
      { apiToken: "Stocks", topic: "ai" },
      { apiToken: "Global", topic: "global" },
      { apiToken: "Trade War", topic: "tariffs" },
      { apiToken: "Gold", topic: "gold" },
      { apiToken: "India", topic: "india" },
    ];

    const responsePromises = topics.map((topic: any) =>
      axios.get(
        `https://newsapi.org/v2/everything?q=${topic?.apiToken}&from=${today}&to=${today}&sortBy=popularity&apiKey=aec6e06109574672b5e6fc9b6d520116`
      )
    );

    const resolvedResponses = await Promise.all(responsePromises);

    const insertPromises = resolvedResponses.map((response, index) =>
      insertOne("news", {
        topic: topics[index]?.topic,
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
    const startofToday = moment().startOf("day").unix();
    const endofData = moment().endOf("day").unix();

    const responsePromises = topics.map((topic) =>
      findAll("news", [
        { topic },
        { date: { $lte: endofData, $gte: startofToday } },
      ])
    );

    console.log(responsePromises, "responsePromises");

    const responses: any = await Promise.all(responsePromises);
    const topicWiseData: Record<string, any[]> = {};
    console.log(responses, "responsePromises");

    responses.forEach((response: any, index: any) => {
      const topic = topics[index];
      topicWiseData[topic] = response[0] || [];
    });

    return {
      success: true,
      date: moment().unix(),
      data: topicWiseData,
    };
  } catch (e: any) {
    console.error("Error fetching news:", e.message);
    return {
      success: false,
      message: "Failed to fetch news data",
      error: e.message,
    };
  }
};
