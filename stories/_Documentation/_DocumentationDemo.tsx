export const DocumentationDemo = ({ folderName }: { folderName: string }) => {
  return (
    <iframe
      className="-m-4 h-screen w-screen"
      src={`docs/${folderName}/index.html`}
    />
  );
};
