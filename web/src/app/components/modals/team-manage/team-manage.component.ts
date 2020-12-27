import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IProjectState } from 'src/app/redux/store/state';
import * as TeamActions from '../../../redux/actions/team.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import { IModalData, ITeam } from '../../../utils/interfaces';
import BaseModalCreation from '../base-modal-creation';

@Component({
    selector: 'app-team-manage',
    templateUrl: './team-manage.component.html',
    styleUrls: ['./team-manage.component.scss'],
})
export class TeamManageComponent extends BaseModalCreation implements OnInit {
    public readonly teamName: string = 'teamName';
    public readonly location: string = 'location';

    public formGroup: FormGroup;

    private projectId: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: IModalData,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {
        super(data.modalType);
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.projectId = x.projectId));

        this.formGroup = this.fb.group({
            [this.teamName]: [(this.data.model as ITeam).teamName, Validators.required],
            [this.location]: [(this.data.model as ITeam).location, Validators.required],
        });
    }

    public onClickCreate = () => {
        const team: ITeam = {
            teamName: this.formGroup.get(this.teamName).value,
            location: this.formGroup.get(this.location).value,
            projectId: this.formGroup.get(this.projectId).value,
        };

        this.store$.dispatch(new TeamActions.CreateTeamRequest(team));
    };
}