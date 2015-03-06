#include <bits/stdc++.h>
using namespace std;

int n,m;
int ma[100][100];
bool visited[100][100];
bool ff;
int sx,sy,tx,ty;

void bfs(int index,int indexy){
	visited[index][indexy]=true;
	// cout<<index<<" "<<indexy<<endl;
	if(index==tx&&indexy==ty){
		ff=true;
		return;
	}
	else{
		int flag=0;
		for(int i=0;i<n;i++){
			for(int j=0;j<m;j++){
				if(visited[i][j]==false){
					flag=1;
					break;
				}
			}
			if(flag==1)
				break;
		}
		if(flag==0)
			return;
	}
	if(index!=0&&visited[index-1][indexy]!=true){
		visited[index-1][indexy]=true;
		bfs(index-1,indexy);
	}
	if(index!=n-1&&visited[index+1][indexy]!=true){
		visited[index+1][indexy]=true;
		bfs(index+1,indexy);
	}
	if(indexy!=0&&visited[index][indexy-1]!=true){
		visited[index][indexy-1]=true;
		bfs(index,indexy-1);
	}
	if(indexy!=m-1&&visited[index][indexy+1]!=true){
		visited[index][indexy+1]=true;
		bfs(index,indexy+1);
	}
}

int main(){
	int T;
	cin>>T;
	while(T--){
		cin>>n>>m;
		memset(visited,false,sizeof(visited));
		ff=false;
		for(int i=0;i<n;i++)
			for(int j=0;j<m;j++){
				cin>>ma[i][j];
				if(ma[i][j]==0)
					visited[i][j]=true;
			}
		cin>>sx>>sy>>tx>>ty;
		sx--;
		sy--;
		tx--;
		ty--;
		// cout<<ma[sx][sy]<<ma[tx][ty];
		bfs(sx,sy);
		if(ff)
			cout<<"1"<<endl;
		else
			cout<<"0"<<endl;
	}
}