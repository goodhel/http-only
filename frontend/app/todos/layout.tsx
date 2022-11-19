export default function TodosLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <p>This is children layout todo</p>
        {children}
    </div>
  );
}