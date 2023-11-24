import { gql, GraphQLClient } from "graphql-request";
import { lensURL } from "../config";

let client:any = new GraphQLClient(lensURL, {});

export const setToken = async (token: string) => {
  client.setHeader('x-access-token', `Bearer ${token}`)
}

export const removeToken = async()=> {
  client = new GraphQLClient(lensURL, {});
}

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

export const getProfileByHandle = async (handle: string) => {
  const query = gql`
    query Profile {
        profile(request: { handle: "${handle}" }) {
          id
          name
          bio
          attributes {
            displayType
            traitType
            key
            value
          }
          followNftAddress
          metadata
          isDefault
          picture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          handle
          coverPicture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          ownedBy
          dispatcher {
            address
            canUseRelay
          }
          stats {
            totalFollowers
            totalFollowing
            totalPosts
            totalComments
            totalMirrors
            totalPublications
            totalCollects
          }
          followModule {
            ... on FeeFollowModuleSettings {
              type
              amount {
                asset {
                  symbol
                  name
                  decimals
                  address
                }
                value
              }
              recipient
            }
            ... on ProfileFollowModuleSettings {
              type
            }
            ... on RevertFollowModuleSettings {
              type
            }
          }
        }
      }
    `;

  return (await client.request(query)).profile;
};

export const getAccessToken = async (address: string, signature: string) => {
  const query = gql`
  mutation Authenticate {
    authenticate(request: {
      address: "${address}",
      signature: "${signature}"
    }) {
      accessToken
      refreshToken
    }
  }
    `;

  return await client.request(query);
};

export const post = async (profileId: number, contentURI: string, collectModule: object, referenceModule: object) => {
  console.log('aaa',profileId.toString(16) )
  const query = gql`
  mutation CreatePostTypedData {
    createPostTypedData(request: {
      profileId: "0x${profileId.toString(16)}",
      contentURI: "${contentURI}",
      collectModule: {
        revertCollectModule: true
      },
      referenceModule: {
        followerOnlyReferenceModule: false
      }
    }) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
    `;

  return await client.request(query);
};



export default {
  setToken,
  removeToken,
  getChallenge,
  getAccessToken,
  post,
  getProfileByHandle,
};
