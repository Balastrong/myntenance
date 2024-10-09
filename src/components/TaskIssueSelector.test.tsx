import { render, screen, fireEvent } from '@testing-library/react';
import { TaskIssueSelector } from './TaskIssueSelector';
import { assignTaskIssue } from '@/services/tasks/api';

jest.mock('@/services/tasks/api');

describe('TaskIssueSelector', () => {
  const mockAssignTaskIssue = assignTaskIssue as jest.MockedFunction<typeof assignTaskIssue>;

  beforeEach(() => {
    mockAssignTaskIssue.mockClear();
  });

  it('renders IssueSelector component', () => {
    render(<TaskIssueSelector taskId={1} repositoryFullName="owner/repo" />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls assignTaskIssue with correct parameters', () => {
    render(<TaskIssueSelector taskId={1} repositoryFullName="owner/repo" />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Select');

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);

    expect(mockAssignTaskIssue).toHaveBeenCalledWith({ id: 1, issueNumber: 123 });
  });

  it('disables button when no issue is selected', () => {
    render(<TaskIssueSelector taskId={1} repositoryFullName="owner/repo" />);
    const button = screen.getByText('Select');
    expect(button).toBeDisabled();
  });

  it('enables button when an issue is selected', () => {
    render(<TaskIssueSelector taskId={1} repositoryFullName="owner/repo" />);
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByText('Select');

    fireEvent.change(input, { target: { value: '123' } });

    expect(button).not.toBeDisabled();
  });
});
