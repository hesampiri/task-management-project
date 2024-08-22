type boardItemProps = {
  name?: string;
};

export function BoardItem({ name }: boardItemProps) {
  return (
    <div className="shadow-md p-3 flex justify-center align-center capitalize cursor-pointer">
      <h1>{name}</h1>
    </div>
  );
}
