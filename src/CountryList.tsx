import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Country } from "./type";

const COUNTRY_QUERY = gql`
query {
    countries {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const CountryList: React.FC = () => {
    const { data } = useQuery<{ countries: Country[] }>(COUNTRY_QUERY);
    const [searchTerm, setSearchTerm] = useState<string>("");

    if (!data) {
        return null;
    }
    const filteredData = data.countries.filter((item) =>
        item.name.includes(searchTerm)
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search.."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input type="text" placeholder="Group by..." />
            <ul>{filteredData.map((item, index) => (
                <li key={index}>{item.name}</li>
            ))}</ul>
        </div>
    );
};

export default CountryList;
