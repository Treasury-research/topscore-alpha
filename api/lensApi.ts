import { gql, GraphQLClient } from "graphql-request";
import { lensURL } from "../config";

const client = new GraphQLClient(lensURL);

export const getChallenge = async (address: string) => {
  const query = gql`
  query Challenge {
    challenge(request: { address: "${address}" }) {
      text
    }
  }
    `;

  return await client.request(query);
};

export const getAccessToken = async (address: string) => {
  const query = gql`
  query Challenge {
    challenge(request: { address: "${address}" }) {
      text
    }
  }
    `;

  return await client.request(query);
};

export default {
  getChallenge,
};
