import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {DeleteConfirmationModal} from '../../modals/delete-confirmation/delete-confirmation';
import {DepartmentModal} from '../../modals/department-modal/department-modal';
import {ProjectModal} from '../../modals/project-modal/project-modal';
import {Department} from '../../models/department';
import {Project} from '../../models/project';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public dataSource;
  public projects: Project[] = [];
  public filterSearch: string;
  // tslint:disable-next-line:max-line-length
  public displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'deadline', 'technologies', 'edit',
    'delete'];

  constructor(private projectsService: ProjectsService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource = new MatTableDataSource(this.projects);
    });
  }

  onFilterChanged() {
    this.dataSource = new MatTableDataSource(this.projects.filter(project => project.name.includes(this.filterSearch)));
  }

  deleteProject(project) {
    let dialogRef = this.dialog.open(DeleteConfirmationModal);

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.projectsService.delete(project.id).subscribe(_ => {
          this.projects = this.projects.filter(d => d.id != project.id);
          this.dataSource = new MatTableDataSource(this.projects);
        })
      }
    });
  }

  editProject(project: Project) {
    let dialogRef = this.dialog.open(ProjectModal, {
      data: {
        project: {...project}
      }
    });

    dialogRef.afterClosed().subscribe(project => {
      this.projectsService.update(project).subscribe(_ => {
        var indexOfProject = this.projects.indexOf(this.projects.find(d => d.id == project.id));
        this.projects[indexOfProject] = project;
        this.dataSource = new MatTableDataSource(this.projects);
      });
    });
  }

  saveProject() {
    let dialogRef = this.dialog.open(ProjectModal, {
      data: {
        project: new Project()
      }
    });
  }
}
