const BlockLink = ({ number }: { number: number }) => {
  const url = `https://etherscan.io/block/${number}`;
  return (
    <a href={url} target="_blank">
      {number}
    </a>
  );
};

export default BlockLink;
