import { gql, GraphQLClient } from "graphql-request";
import { lensURL } from "../config";

const client = new GraphQLClient(lensURL, {
  // headers:{
  //   'x-access-token': sessionStorage.getItem('accessToken')
  // }
});

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
  getChallenge,
  getAccessToken,
  post,
};
