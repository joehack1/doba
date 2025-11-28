import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrap = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  &:focus { outline: none; box-shadow: 0 4px 18px rgba(100,103,255,0.12); border-color: ${({ theme }) => theme.colors.primary}; }
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryLight});
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
`;

export default function SearchBar({ onSearch = () => {}, placeholder = "Search tracks, artists...", inputRef = null }) {
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    onSearch(q);
  }, [q]);

  return (
    <Wrap>
      <Input
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      <Btn aria-label="Search button" onClick={() => onSearch(q)}>
        <FaSearch /> Search
      </Btn>
    </Wrap>
  );
}
