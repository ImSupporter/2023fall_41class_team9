
import React, {useState, useEffect} from 'react';
import ReactDOM	from 'react-dom';
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import axios from 'axios';
import Menubar from './components/Menubar.js'


//###
import {useCookies} from 'react-cookie';

function History(props) {
	//###
	const [cookies, setCookie, removeCookie] = useCookies(['session_key']);
	
	const [expList,setExpList] = useState(
		[ 
		]
	);

	useEffect(()=>{
		console.log('component mounted!')
		listHist();
		//loadTestData();
	},[])


	const navigate = useNavigate();
	const location = useLocation();
	const params = useParams();

	const naviToHomeDetail = (id) => {
		console.log('#id: '+id);
		navigate('/homeDetail', {state: {id: id}});
	}

	const listHist = () => {
		console.log('listHist~');
		//###
		const session_key = cookies.session_key
		const headers = {'Authorization':session_key};
		console.log('#session_key: '+session_key);
		console.log('#headers: '+JSON.stringify(headers));

		let param = {};
		console.log('#req param: '+JSON.stringify(param));
		//axios.post('/listHist.do', param)
		axios.get('/history', {params:param, headers: headers})
		.then(res => {
			console.log('#resp: '+JSON.stringify(res.data));
			//setExpList(res.data);
			setExpList(res.data.history);
		}).catch(error => {
			console.log('#load error '+error)
		})
	}

	const loadTestData = () => {
		let testData = [
			{"id":"001","run_time":"0.01","title":"그린 알고리즘 자바코드 실험 1", "footprint":"35.23","create_time":"2023-11-05 10:10:00"},
			{"id":"002","run_time":"0.02","title":"그린 알고리즘 자바코드 실험 2", "footprint":"35.25","create_time":"2023-11-05 10:10:10"},
			{"id":"003","run_time":"0.03","title":"그린 알고리즘 자바코드 실험 3", "footprint":"35.35","create_time":"2023-11-05 10:10:20"}
		];
		setExpList(testData);
	}

	const compare = () => {
		var checks = document.getElementsByName("check");

		var ids = []
		for (var i = 0; i < checks.length; i++){
			//console.log('#check: '+checks[i].checked+','+checks[i].value);
			if (checks[i].checked == true) {
				ids.push(checks[i].value);
			}
		}
		console.log('#ids: '+ids);

		navigate('/compare', {state: {ids:ids}});
	}

	const viewSinglePage = (id) => {
		navigate('/single', {state: {id: [id]}});
	}

	//render() =>
	return (
		<div>
			<Menubar/>

			<div style={{textAlign:"center", margin:"1px", fontSize:"22px"}} >Green Algorithms History</div>
			<br/>

			<div align="right">
				<button style={{fontSize:"15px", marginRight:"10px"}} onClick={compare} >compare</button>
			</div>

  			<div>
  				<table className="table" style={{width:"100%"}}>
  					<thead>
  					<tr align="center">
  						<td width="10%">체크</td>
  						<td width="30%">Experiment Name</td>
  						<td width="10%">탄소배출량</td>
  						<td width="20%">런타임</td>
  						<td width="20%">Create Time</td>
  					</tr>
  					</thead>
  					<tbody id="itbody">
						{ expList.map(exp => (
							<tr	align="center" key={exp.id}>
								{/*<td><input type="checkbox" id="id" name="name" /></td>*/}
								<td><input type="checkbox" id="id" name="check" value={exp.id}/></td>
								<td><a onClick={()=>{viewSinglePage(exp.id)}}>{exp.title}</a></td>
								<td>{exp.footprint}</td>
								<td>{exp.run_time}</td>
								<td>{exp.create_time.substr(0,19)}</td>
							</tr>
						))
						}
  					</tbody>
  				</table>
  			</div>
		</div>
	)
}

export default History;
