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

export const queryCompany = `query CompanyQuery($id: ID!) {
        company(id: $id) {
          id
          name
          description
        }
      }
      `;
