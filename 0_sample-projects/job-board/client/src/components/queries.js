export const queryJobs = `{
        jobs {
          id
          title
          company {
            id
            name
            description
          }
          description
        }
      }
      `;
export const queryJob = `query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          company {
            id
            name
            description
          }
          description
        }
      }
      `;
