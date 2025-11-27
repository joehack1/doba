import React from "react";
import styled from "styled-components";
import { FaSearch, FaUser } from "react-icons/fa";

const Bar = styled.header`
  grid-column: 2 / -1;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 8px 16px;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
  outline: none;
  flex: 1;
  &::placeholder {
    color: ${({theme}) => theme.colors.subtext};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
`;

export default function TopBar({ onSearchChange }) {
  return (
    <Bar>
      <SearchContainer>
        <FaSearch style={{ color: "rgba(255,255,255,0.5)", marginRight: 8 }} />
        <SearchInput
          placeholder="What do you want to listen to?"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchContainer>
      <UserProfile>
        <FaUser />
        <span>User</span>
      </UserProfile>
    </Bar>
  );
}
