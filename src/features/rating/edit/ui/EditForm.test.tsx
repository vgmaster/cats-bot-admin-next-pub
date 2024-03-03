import { render, screen } from "@testing-library/react";
import { EditForm } from "./EditForm";

import { type TRating } from "@/entities/rating";

describe("Рейтинг", () => {
  let mockRating: TRating;

  beforeEach(() => {
    mockRating = {
      id: 1,
      url: "mockUrl",
      resource_type: "mockResourceType",
      tag: "tag",
      shows: 0,
      likes: 1,
      dislikes: 1,
      is_visible: true,
      raw_tags: "raw tags",
      created_at: null,
      updated_at: null,
    };
  });

  test("Отображение формы редактирования", () => {
    render(<EditForm rating={mockRating} />);
    expect(screen.getByPlaceholderText("URL")).toBeInTheDocument();
  });
});
