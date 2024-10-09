import { render, screen, fireEvent } from '@testing-library/react';
import { TaskPullRequestSelector } from './TaskPullRequestSelector';
import { assignTaskPullRequest } from '@/services/tasks/api';

jest.mock('@/services/tasks/api');

describe('TaskPullRequestSelector', () => {
  const mockAssignTaskPullRequest = assignTaskPullRequest as jest.MockedFunction<typeof assignTaskPullRequest>;

  beforeEach(() => {
    mockAssignTaskPullRequest.mockClear();
  });

  it('renders IssueSelector component', () => {
    render(<TaskPullRequestSelector taskId={1} repositoryFullName="owner/repo" />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls assignTaskPullRequest with correct parameters', () => {
    render(<TaskPullRequestSelector taskId={1} repositoryFullName="owner/repo" />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Select');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);

    expect(mockAssignTaskPullRequest).toHaveBeenCalledWith({ id: 1, prNumber: 123 });
  });

  it('disables button when no pull request is selected', () => {
    render(<TaskPullRequestSelector taskId={1} repositoryFullName="owner/repo" />);
    const button = screen.getByText('Select');
    expect(button).toBeDisabled();
  });

  it('enables button when a pull request is selected', () => {
    render(<TaskPullRequestSelector taskId={1} repositoryFullName="owner/repo" />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Select');

    fireEvent.change(input, { target: { value: '123' } });

    expect(button).not.toBeDisabled();
  });
});
