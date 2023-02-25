import {
  Box,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";
import BarChart from "../charts/BarChart";

const colorScheme = {
  total: "gray.800",
  pending: "red.500",
  completed: "green.500",
  individual: "purple.500",
  shared: "teal.600",
};

const Statistics = ({ heading, data, labels, barData }) => {
  let stats = Object.keys(data);
  return (
    <Box my={3}>
      <Text fontSize="2xl" as="b">
        {heading}
      </Text>
      <StatGroup
        maxW={800}
        border="1px"
        borderColor="gray.300"
        borderRadius={7}
        p={3}
        gap={3}
      >
        {stats.map((stat, index) => (
          <Stat bg="gray.100" p={2} borderRadius={5}>
            <StatLabel>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </StatLabel>
            <StatNumber color={colorScheme[stat]}>{data[stat]}</StatNumber>
          </Stat>
        ))}
      </StatGroup>
      <Box border="1px" borderColor="gray.300" borderRadius={5} p={3} my={4}>
        <BarChart labels={labels} data={barData} />
      </Box>
    </Box>
  );
};

export default Statistics;
