---
layout: dashboard
title: "Analytics Dashboard"
actions: ["Export", "Refresh", "Settings"]
---

<div class="row">
  {% include layouts/dashboard/dashboard-widget.html
    title="Total Users"
    value="12,543"
    change=12.5
    icon="fas fa-users"
    columns="3"
  %}
  
  {% include layouts/dashboard/dashboard-widget.html
    title="Revenue"
    value="$45,678"
    change=8.3
    icon="fas fa-dollar-sign"
    columns="3"
  %}
  
  {% include layouts/dashboard/dashboard-widget.html
    title="Conversion Rate"
    value="3.24%"
    change=-2.1
    icon="fas fa-chart-line"
    columns="3"
  %}
  
  {% include layouts/dashboard/dashboard-widget.html
    title="Avg. Session"
    value="4m 32s"
    change=5.7
    icon="fas fa-clock"
    columns="3"
  %}
</div>

<div class="row mt-4">
  <div class="col-lg-8 mb-4">
    <div class="card h-100">
      <div class="card-header">
        <h5 class="card-title mb-0">Traffic Overview</h5>
      </div>
      <div class="card-body">
        <div class="chart-container" style="height: 300px;">
          <!-- Chart would go here -->
          <div class="d-flex align-items-center justify-content-center h-100 text-muted">
            <div class="text-center">
              <i class="fas fa-chart-area fa-3x mb-3"></i>
              <p>Traffic chart placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-lg-4 mb-4">
    <div class="card h-100">
      <div class="card-header">
        <h5 class="card-title mb-0">Top Pages</h5>
      </div>
      <div class="card-body">
        <ul class="list-unstyled mb-0">
          <li class="mb-3 pb-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-bold">/home</div>
                <small class="text-muted">15,432 views</small>
              </div>
              <span class="badge bg-primary">45%</span>
            </div>
          </li>
          <li class="mb-3 pb-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-bold">/products</div>
                <small class="text-muted">8,234 views</small>
              </div>
              <span class="badge bg-primary">24%</span>
            </div>
          </li>
          <li class="mb-3 pb-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-bold">/about</div>
                <small class="text-muted">5,123 views</small>
              </div>
              <span class="badge bg-primary">15%</span>
            </div>
          </li>
          <li>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <div class="fw-bold">/contact</div>
                <small class="text-muted">3,456 views</small>
              </div>
              <span class="badge bg-primary">10%</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">Recent Activity</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Page</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:23 AM</td>
                <td>john@example.com</td>
                <td>Page View</td>
                <td>/products/item-123</td>
                <td><span class="badge bg-success">Success</span></td>
              </tr>
              <tr>
                <td>10:21 AM</td>
                <td>sarah@example.com</td>
                <td>Purchase</td>
                <td>/checkout</td>
                <td><span class="badge bg-success">Success</span></td>
              </tr>
              <tr>
                <td>10:18 AM</td>
                <td>mike@example.com</td>
                <td>Sign Up</td>
                <td>/register</td>
                <td><span class="badge bg-success">Success</span></td>
              </tr>
              <tr>
                <td>10:15 AM</td>
                <td>emma@example.com</td>
                <td>Login Failed</td>
                <td>/login</td>
                <td><span class="badge bg-danger">Failed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
