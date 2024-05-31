const Filter = ({
  onFilterChange,
  onSearchChange,
}: {
  onFilterChange: (type: string, value: string) => void;
  onSearchChange: (searchTerm: string) => void;
}) => {
  return (
    <div className="p-4 bg-gray-100 rounded-md mb-4">
      <div className="flex flex-wrap justify-between items-center my-2 gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded-md"
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <select
            className="p-2 border rounded-md"
            onChange={(e) => onFilterChange("priority", e.target.value)}
          >
            <option value="">Filter by priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            className="p-2 border rounded-md"
            onChange={(e) => onFilterChange("status", e.target.value)}
          >
            <option value="">Filter by status</option>
            <option value="done">Done</option>
            <option value="not yet">Not Yet</option>
          </select>
          <select
            className="p-2 border rounded-md"
            onChange={(e) => onFilterChange("dueDate", e.target.value)}
          >
            <option value="">Sort by due date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
