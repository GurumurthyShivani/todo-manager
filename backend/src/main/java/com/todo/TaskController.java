package com.todo;

import jakarta.validation.Valid;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {

    private final TaskRepository repo;

    public TaskController(TaskRepository repo) {
        this.repo = repo;
    }

    /** GET /api/tasks?status=ALL|PENDING|COMPLETED|OVERDUE&search=text */
    @GetMapping
    public List<Task> list(@RequestParam(defaultValue = "ALL") String status,
                           @RequestParam(required = false) String search) {
        String q = search == null ? "" : search.trim().toLowerCase();
        return repo.findAll().stream()
                .filter(t -> switch (status.toUpperCase()) {
                    case "PENDING" -> t.getStatus() == Task.Status.PENDING;
                    case "COMPLETED" -> t.getStatus() == Task.Status.COMPLETED;
                    case "OVERDUE" -> t.isOverdue();
                    default -> true;
                })
                .filter(t -> q.isEmpty()
                        || t.getTitle().toLowerCase().contains(q)
                        || (t.getDescription() != null && t.getDescription().toLowerCase().contains(q)))
                .sorted(Comparator.comparing(Task::getStatus)
                        .thenComparing(Task::getDeadline, Comparator.nullsLast(Comparator.naturalOrder())))
                .toList();
    }

    @GetMapping("/{id}")
    public Task get(@PathVariable Long id) {
        return find(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody Task task) {
        return repo.save(copy(new Task(), task));
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @Valid @RequestBody Task task) {
        return repo.save(copy(find(id), task));
    }

    /** PATCH /api/tasks/{id}/status  body: {"status":"COMPLETED"} */
    @PatchMapping("/{id}/status")
    public Task setStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Task task = find(id);
        task.setStatus(Task.Status.valueOf(body.getOrDefault("status", "").toUpperCase()));
        return repo.save(task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        repo.delete(find(id));
    }

    private Task find(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    private Task copy(Task target, Task src) {
        target.setTitle(src.getTitle().trim());
        target.setDescription(src.getDescription());
        target.setDeadline(src.getDeadline());
        target.setPriority(src.getPriority());
        if (src.getStatus() != null) target.setStatus(src.getStatus());
        return target;
    }
}
