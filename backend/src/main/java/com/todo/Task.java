package com.todo;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

@Entity
public class Task {

    public enum Status { PENDING, COMPLETED }
    public enum Priority { LOW, MEDIUM, HIGH }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 120, message = "Title must be 120 characters or fewer")
    private String title;

    @Size(max = 1000, message = "Description must be 1000 characters or fewer")
    @Column(length = 1000)
    private String description;

    private LocalDate deadline;

    private LocalDate createdAt;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @PrePersist @PreUpdate
    void applyDefaults() {
        if (createdAt == null) createdAt = LocalDate.now();
        if (status == null) status = Status.PENDING;
        if (priority == null) priority = Priority.MEDIUM;
    }

    /** Computed field, included in the JSON response. */
    @JsonProperty(value = "overdue", access = JsonProperty.Access.READ_ONLY)
    public boolean isOverdue() {
        return status != Status.COMPLETED && deadline != null && deadline.isBefore(LocalDate.now());
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getDeadline() { return deadline; }
    public void setDeadline(LocalDate deadline) { this.deadline = deadline; }
    public LocalDate getCreatedAt() { return createdAt; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
}
